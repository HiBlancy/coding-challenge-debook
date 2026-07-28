import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/** Query params de `GET /v1/users/:id/posts`. */
export class ListPostsQueryDto {
  /** Nº máximo de posts a devolver. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit = 10;

  /**
   * Cursor de paginación. Decide tú el formato (ej. el `createdAt`/`id` del
   * último post de la página anterior). Si no se envía, se devuelve la 1ª página.
   */
  @IsOptional()
  @IsString()
  cursor?: string;
}
