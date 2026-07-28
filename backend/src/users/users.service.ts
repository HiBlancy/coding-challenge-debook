import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsPageDto } from '../posts/dto/post.dto';
import { ListPostsQueryDto } from '../posts/dto/list-posts-query.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  /**
   * ✅ IMPLEMENTADO — te lo dejamos como referencia del estilo que esperamos
   * (repos tipados, DTOs, errores de dominio). Devuelve el header del perfil.
   */
  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.users.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`No existe el usuario ${userId}`);
    }
    return UserProfileDto.fromEntity(user);
  }

  /**
   * 🚧 TODO — `GET /v1/users/:id/posts`.
   *
   * Posts cuyo `profileOwnerId === userId`, paginados por cursor
   * (`query.limit`, `query.cursor`). Cada post incluye su autor y el flag
   * `likedByMe` para `currentUserId`. Devuelve un `PostsPageDto`.
   */
  async getProfilePosts(
    userId: string,
    currentUserId: string,
    query: ListPostsQueryDto,
  ): Promise<PostsPageDto> {
    void userId;
    void currentUserId;
    void query;
    throw new NotImplementedException(
      'TODO: implementa UsersService.getProfilePosts (GET /v1/users/:id/posts)',
    );
  }
}
