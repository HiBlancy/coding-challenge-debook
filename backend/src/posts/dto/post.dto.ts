import { PostEntity } from '../post.entity';

class PostAuthorDto {
  id!: string;
  fullName!: string;
  avatarUrl!: string;
  verified!: boolean;
  isAuthor!: boolean;
  booksCount!: number;
}

/** Un post tal y como lo pinta la tarjeta del feed. */
export class PostDto {
  id!: string;
  author!: PostAuthorDto;
  content!: string;
  location!: string | null;
  linkLabel!: string | null;
  bookTitle!: string | null;
  bookAuthor!: string | null;
  bookCoverUrl!: string | null;
  createdAt!: string;

  likesCount!: number;
  commentsCount!: number;
  repostsCount!: number;
  savesCount!: number;

  /** ¿El usuario autenticado (x-user-id) ya dio like a este post? */
  likedByMe!: boolean;

  static fromEntity(post: PostEntity, likedByMe: boolean): PostDto {
    const dto = new PostDto();
    dto.id = post.id;
    dto.author = {
      id: post.author.id,
      fullName: post.author.fullName,
      avatarUrl: post.author.avatarUrl,
      verified: post.author.verified,
      isAuthor: post.author.isAuthor,
      booksCount: post.author.booksCount,
    };
    dto.content = post.content;
    dto.location = post.location;
    dto.linkLabel = post.linkLabel;
    dto.bookTitle = post.bookTitle;
    dto.bookAuthor = post.bookAuthor;
    dto.bookCoverUrl = post.bookCoverUrl;
    dto.createdAt = post.createdAt.toISOString();
    dto.likesCount = post.likesCount;
    dto.commentsCount = post.commentsCount;
    dto.repostsCount = post.repostsCount;
    dto.savesCount = post.savesCount;
    dto.likedByMe = likedByMe;
    return dto;
  }
}

/** Página de posts (paginación por cursor). */
export class PostsPageDto {
  items!: PostDto[];
  /** Cursor para pedir la siguiente página, o `null` si no hay más. */
  nextCursor!: string | null;
}
