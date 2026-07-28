import { UserEntity } from '../user.entity';

/** Respuesta de `GET /v1/users/:id` — el header del perfil. */
export class UserProfileDto {
  id!: string;
  displayName!: string;
  fullName!: string;
  tagline!: string;
  bio!: string;
  avatarUrl!: string;
  verified!: boolean;
  isAuthor!: boolean;
  booksCount!: number;
  followersCount!: number;
  lifeScore!: number;

  static fromEntity(user: UserEntity): UserProfileDto {
    const dto = new UserProfileDto();
    dto.id = user.id;
    dto.displayName = user.displayName;
    dto.fullName = user.fullName;
    dto.tagline = user.tagline;
    dto.bio = user.bio;
    dto.avatarUrl = user.avatarUrl;
    dto.verified = user.verified;
    dto.isAuthor = user.isAuthor;
    dto.booksCount = user.booksCount;
    dto.followersCount = user.followersCount;
    dto.lifeScore = user.lifeScore;
    return dto;
  }
}
