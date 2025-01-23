import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Test Movies (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/movies/outliers (GET)', async () => {
    const expectedResponse = {
      min: [
        {
          producer: 'Bo Derek',
          interval: 6,
          previousWin: 1984,
          followingWin: 1990,
        },
      ],
      max: [
        {
          producer: 'Bo Derek',
          interval: 6,
          previousWin: 1984,
          followingWin: 1990,
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .get('/movies/outliers')
      .expect(200);

    expect(response.body).toEqual(expectedResponse);
  });
});
