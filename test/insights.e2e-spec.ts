import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('InsightsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/insights (GET) should return dashboard info', async () => {
    const response = await request(app.getHttpServer()).get('/insights').expect(200);

    expect(response.body).toHaveProperty('totalFarms');
    expect(response.body).toHaveProperty('totalHectares');
    expect(Array.isArray(response.body.byState)).toBe(true);
    expect(Array.isArray(response.body.byCrop)).toBe(true);
    expect(Array.isArray(response.body.landUse)).toBe(true);
  });
});
