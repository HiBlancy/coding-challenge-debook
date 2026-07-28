import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { LikeEntity } from '../likes/like.entity';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';

/**
 * Datos de arranque de la prueba.
 *
 * IDs fijos para que el frontend pueda referenciarlos sin adivinar:
 *   ALBERTO  → dueño del perfil (el header pixel-perfect).
 *   SANTI    → autor/a de los posts que aparecen en su tab "Convos".
 *   MARIO    → "usuario autenticado" por defecto (el de la barra inferior).
 *              Úsalo como `x-user-id` al probar los likes.
 */
const ALBERTO_ID = '11111111-1111-1111-1111-111111111111';
const SANTI_ID = '22222222-2222-2222-2222-222222222222';
const MARIO_ID = '33333333-3333-3333-3333-333333333333';

const POST_1_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const POST_2_ID = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

const POST_BODY =
  'Acabo de terminar Encontrar un hogar de René Ponte y hay una idea que no ha ' +
  'dejado de dar vueltas en mi cabeza:\n' +
  'Tal vez el hogar nunca fue un lugar. Tal vez siempre fue una persona. O una ' +
  'versión de nosotros mismos que aún no conocíamos.';

function options(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'debook',
    password: process.env.DB_PASSWORD ?? 'debook',
    database: process.env.DB_NAME ?? 'debook',
    entities: [UserEntity, PostEntity, LikeEntity],
    synchronize: true,
  };
}

async function seed(): Promise<void> {
  const ds = new DataSource(options());
  await ds.initialize();

  // Reset limpio (respetando FKs). TRUNCATE ... CASCADE vacía todo de una.
  await ds.query('TRUNCATE TABLE "likes", "posts", "users" RESTART IDENTITY CASCADE');

  const users = ds.getRepository(UserEntity);

  const alberto = users.create({
    id: ALBERTO_ID,
    displayName: 'Alberto',
    fullName: 'Alberto Rodilla',
    tagline: 'Debooker',
    bio: 'Empresario y obsesionado de los libros',
    avatarUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Haruki_Murakami_2018.jpg',
    verified: true,
    isAuthor: false,
    booksCount: 544,
    followersCount: 1_100_000,
    lifeScore: 300,
  });

  const santi = users.create({
    id: SANTI_ID,
    displayName: 'Santi',
    fullName: 'Santi Leal',
    tagline: 'Debooker',
    bio: 'Escribo sobre lo que leo.',
    avatarUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Haruki_Murakami_2018.jpg',
    verified: true,
    isAuthor: true,
    booksCount: 33,
    followersCount: 12_400,
    lifeScore: 120,
  });

  const mario = users.create({
    id: MARIO_ID,
    displayName: 'Mario',
    fullName: 'Mario Casas',
    tagline: 'Debooker',
    bio: 'Aquí para leer.',
    avatarUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Haruki_Murakami_2018.jpg',
    verified: false,
    isAuthor: false,
    booksCount: 4,
    followersCount: 0,
    lifeScore: 10,
  });

  await users.save([alberto, santi, mario]);

  const posts = ds.getRepository(PostEntity);
  const basePost = {
    authorId: SANTI_ID,
    profileOwnerId: ALBERTO_ID,
    content: POST_BODY,
    location: 'Barcelona, España',
    linkLabel: 'No te lo pierdas esto!!!!!',
    bookTitle: 'Encontrar un hogar',
    bookAuthor: 'René Ponte',
    bookCoverUrl: null,
    commentsCount: 454,
    repostsCount: 1_000,
    savesCount: 52_000,
  };

  await posts.save([
    posts.create({
      ...basePost,
      id: POST_1_ID,
      likesCount: 21_000,
      createdAt: new Date('2025-09-05T10:00:00Z'),
    }),
    posts.create({
      ...basePost,
      id: POST_2_ID,
      likesCount: 21_000,
      createdAt: new Date('2025-09-05T09:00:00Z'),
    }),
  ]);

  // eslint-disable-next-line no-console
  console.log(
    [
      '🌱 Seed completado.',
      `   Perfil (Alberto):        ${ALBERTO_ID}`,
      `   Autor de los posts:      ${SANTI_ID} (Santi Leal)`,
      `   Usuario para likes:      ${MARIO_ID} (x-user-id)`,
      `   Posts:                   ${POST_1_ID}, ${POST_2_ID}`,
      '',
      '   Prueba:  GET /v1/users/' + ALBERTO_ID + '/posts   (con x-user-id)',
    ].join('\n'),
  );

  await ds.destroy();
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('❌ Seed falló:', err);
  process.exit(1);
});
