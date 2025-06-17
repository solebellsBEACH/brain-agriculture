import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { CreateCropDto } from 'src/crop/dto/create-crop.dto';
import { mocks } from '../src/database/mocks';
import { UpdateCropDto } from 'src/crop/dto/update-crop.dto';

describe('CropsController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;
  let dataSource: DataSource;
  let createdCropId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    httpServer = app.getHttpServer();
    dataSource = moduleFixture.get(DataSource);
  });

  afterAll(async () => {
    if (dataSource) {
      await dataSource.destroy();
    }
    await app.close();
  });

  it('should create a crop (POST /crops)', async () => {

    const responseProperty = await request(app.getHttpServer())
        .get('/properties')

    const crop: CreateCropDto = {
      name: 'Mamão',
      harvest_year: 2003,
      propertyId: responseProperty.body.data[0].id,
      utilization_percentage:10.3,
      value_growth:3,
      value_per_unit:20.5,
      expected_yield:39
    };

    const response = await request(httpServer)
      .post('/crops')
      .send(crop)
      .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(crop.name);

      createdCropId = response.body.id;
  });

  it('should retrieve all crops (GET /crops)', async () => {
    const response = await request(httpServer).get('/crops').expect(200);

    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should retrieve a crop by ID (GET /crops/:id)', async () => {
    const response = await request(httpServer)
      .get(`/crops/${createdCropId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCropId);
  });

  it('should update a crop (PUT /crops/:id)', async () => {
    const updateData: UpdateCropDto = {
      name: 'Updated Soybean',
      harvest_year: 2020,
    };

    const response = await request(httpServer)
      .put(`/crops/${createdCropId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.name).toBe(updateData.name);
  });

  it('should delete a crop (DELETE /crops/:id)', async () => {
    await request(httpServer).delete(`/crops/${createdCropId}`).expect(200);
  });

  it('should return 404 for a non-existent crop (GET /crops/:id)', async () => {
    await request(httpServer).get(`/crops/${createdCropId}`).expect(404);
  });
});
