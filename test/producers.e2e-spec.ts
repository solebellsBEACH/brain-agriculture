import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('ProducersController (e2e)', () => {
  let app: INestApplication;
  let db: DataSource;
  let createdId: string;
  let name: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    db = moduleFixture.get(DataSource);
  });

  afterAll(async () => {
    await db.destroy();
    await app.close();
  });

  it('/POST producers', async () => {
    name = faker.person.fullName();
    const res = await request(app.getHttpServer())
      .post('/producers')
      .send({
        name,
        document: faker.number
          .int({ min: 100000000000, max: 999999999999 })
          .toString(),
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(name);
    createdId = res.body.id;
  });

  it('/GET producers', async () => {
    const res = await request(app.getHttpServer())
      .get('/producers')
      .expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('/GET producers/:id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/producers/${createdId}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
    expect(res.body.name).toBe(name);
  });

  it('/PUT producers/:id', async () => {
    const res = await request(app.getHttpServer())
      .put(`/producers/${createdId}`)
      .send({ name: 'João Atualizado' })
      .expect(200);

    expect(res.body.name).toBe('João Atualizado');
  });

  it('/DELETE producers/:id', async () => {
    await request(app.getHttpServer())
      .delete(`/producers/${createdId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/producers/${createdId}`)
      .expect(404);
  });
});
