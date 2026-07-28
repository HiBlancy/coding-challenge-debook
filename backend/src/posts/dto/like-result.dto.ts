/** Respuesta de `POST` / `DELETE` `/v1/posts/:id/like`. */
export class LikeResultDto {
  postId!: string;
  /** Estado final tras la operación. */
  likedByMe!: boolean;
  /** Contador de likes ya consolidado tras la operación. */
  likesCount!: number;
}
