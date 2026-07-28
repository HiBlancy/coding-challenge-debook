import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { LikeEntity } from '../src/likes/like.entity';
import { PostEntity } from '../src/posts/post.entity';

/** IDs fijos del seed (`src/database/seed.ts`). */
const MARIO_ID = '33333333-3333-3333-3333-333333333333';
const POST_1_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const SEED_LIKES_COUNT = 21_000;

describe('POST /v1/posts/:id/like (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();

    dataSource = app.get(DataSource);
  });

  beforeEach(async () => {
    await dataSource.getRepository(LikeEntity).delete({
      userId: MARIO_ID,
      postId: POST_1_ID,
    });
    await dataSource
      .getRepository(PostEntity)
      .update({ id: POST_1_ID }, { likesCount: SEED_LIKES_COUNT });
  });

  afterAll(async () => {
    await app.close();
  });

  it('responde 401 si falta la cabecera x-user-id', async () => {
    await request(app.getHttpServer())
      .post(`/v1/posts/${POST_1_ID}/like`)
      .expect(401);
  });

  it('segundo POST con el mismo usuario y post no duplica likesCount', async () => {
    const first = await request(app.getHttpServer())
      .post(`/v1/posts/${POST_1_ID}/like`)
      .set('x-user-id', MARIO_ID)
      .expect(200);

    expect(first.body).toMatchObject({
      postId: POST_1_ID,
      likedByMe: true,
      likesCount: SEED_LIKES_COUNT + 1,
    });

    const second = await request(app.getHttpServer())
      .post(`/v1/posts/${POST_1_ID}/like`)
      .set('x-user-id', MARIO_ID)
      .expect(200);

    expect(second.body).toEqual({
      postId: POST_1_ID,
      likedByMe: true,
      likesCount: first.body.likesCount,
    });
  });

  it('POST y luego DELETE: likedByMe pasa a false y likesCount vuelve al original', async () => {
    const liked = await request(app.getHttpServer())
      .post(`/v1/posts/${POST_1_ID}/like`)
      .set('x-user-id', MARIO_ID)
      .expect(200);

    expect(liked.body).toMatchObject({
      likedByMe: true,
      likesCount: SEED_LIKES_COUNT + 1,
    });

    const unliked = await request(app.getHttpServer())
      .delete(`/v1/posts/${POST_1_ID}/like`)
      .set('x-user-id', MARIO_ID)
      .expect(200);

    expect(unliked.body).toEqual({
      postId: POST_1_ID,
      likedByMe: false,
      likesCount: SEED_LIKES_COUNT,
    });
  });
});
