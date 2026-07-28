/** Modelos que devuelve la API (ver DTOs del backend). */

export interface UserProfile {
  id: string;
  displayName: string;
  fullName: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  isAuthor: boolean;
  booksCount: number;
  followersCount: number;
  lifeScore: number;
}

export interface PostAuthor {
  id: string;
  fullName: string;
  avatarUrl: string;
  verified: boolean;
  isAuthor: boolean;
  booksCount: number;
}

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  location: string | null;
  linkLabel: string | null;
  bookTitle: string | null;
  bookAuthor: string | null;
  bookCoverUrl: string | null;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  savesCount: number;
  likedByMe: boolean;
}

export interface PostsPage {
  items: Post[];
  nextCursor: string | null;
}

export interface LikeResult {
  postId: string;
  likedByMe: boolean;
  likesCount: number;
}
