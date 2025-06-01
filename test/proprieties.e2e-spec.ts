import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/.';

describe('Properties (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let createdId: string;
    let name: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
        await app.init();

        dataSource = moduleFixture.get(DataSource);
    });

    afterAll(async () => {
        await dataSource.destroy();
        await app.close();
    });

    it('POST /properties - should create a property', async () => {
        name = faker.person.fullName()
        const res = await request(app.getHttpServer())
            .post('/properties')
            .send({
                name,
                document: faker.number.int({ min: 100000000000, max: 999999999999 }).toString(),
                city: 'Ribeirão Preto',
                state: 'SP',
                total_area: 100,
                arable_area: 2,
                vegetation_area: 80
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(name);
        createdId = res.body.id;
    });

    it('POST /properties - should return props missing message', async () => {
        const res = await request(app.getHttpServer())
            .post('/properties')
            .send({
                name: faker.person.fullName(),
                city: 'Ribeirão Preto',
                state: 'SP',
                total_area: 100,
                arable_area: 2,
                vegetation_area: 80
            }).expect(400)

        expect((res.body?.message || [])[0]).toBe('document must be a string')
    });

    it('POST /properties - should return wrong area message', async () => {
        const res = await request(app.getHttpServer())
            .post('/properties')
            .send({
                name: faker.person.fullName(),
                city: 'Ribeirão Preto',
                document: faker.number.int({ min: 100000000000, max: 999999999999 }).toString(),
                state: 'SP',
                total_area: 10,
                arable_area: 2,
                vegetation_area: 80
            })
            .expect(500)

        expect(res.body.message || '').toBe("The sum of the arable area and vegetation area must be smaller than the total area")
    });

    it('GET /properties - should return all properties', async () => {
        const res = await request(app.getHttpServer())
            .get('/properties')
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /properties/:id - should return the created property', async () => {
        const res = await request(app.getHttpServer())
            .get(`/properties/${createdId}`)
            .expect(200);

        expect(res.body.id).toBe(createdId);
        expect(res.body.name).toBe(name);
    });

    it('PUT /properties/:id - should update the property', async () => {
        const res = await request(app.getHttpServer())
            .put(`/properties/${createdId}`)
            .send({
                name: 'Fazenda Atualizada',
                city: 'Campinas',
                state: 'SP',
                document: '12345678900',
            })
            .expect(200);

        expect(res.body.name).toBe('Fazenda Atualizada');
        expect(res.body.city).toBe('Campinas');
    });

    it('DELETE /properties/:id - should delete the property', async () => {
        const res = await request(app.getHttpServer())
            .delete(`/properties/${createdId}`)
            .expect(200);

        expect(res.body).toEqual({ message: 'Deleted successfully' });
    });

    it('GET /properties/:id - should return 404 after deletion', async () => {
        await request(app.getHttpServer())
            .get(`/properties/${createdId}`)
            .expect(404);
    });
});
