import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LikeEntity } from '../likes/like.entity';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';

/**
 * Configuración de conexión compartida entre la app y el script de seed.
 * Lee de variables de entorno (.env) — ver `.env.example`.
 */
export function buildDataSourceOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'debook',
    password: process.env.DB_PASSWORD ?? 'debook',
    database: process.env.DB_NAME ?? 'debook',
    entities: [UserEntity, PostEntity, LikeEntity],
    synchronize: (process.env.DB_SYNCHRONIZE ?? 'true') === 'true',
    logging: false,
  };
}
