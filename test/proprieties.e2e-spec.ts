import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('Properties (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let createdId: string;

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
        const res = await request(app.getHttpServer())
            .post('/properties')
            .send({
                name: 'Fazenda São João',
                document: '12345678900',
                city: 'Ribeirão Preto',
                state: 'SP',
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Fazenda São João');
        createdId = res.body.id;
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
        expect(res.body.name).toBe('Fazenda São João');
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
