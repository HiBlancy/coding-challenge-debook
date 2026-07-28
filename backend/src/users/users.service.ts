import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '../likes/like.entity';
import { ListPostsQueryDto } from '../posts/dto/list-posts-query.dto';
import { PostDto, PostsPageDto } from '../posts/dto/post.dto';
import { PostEntity } from '../posts/post.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserEntity } from './user.entity';

type ProfilePostsCursorPayload = {
  createdAt: string;
  id: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly posts: Repository<PostEntity>,
    @InjectRepository(LikeEntity)
    private readonly likes: Repository<LikeEntity>,
  ) { }

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
   * Posts cuyo `profileOwnerId === userId`, paginados por cursor
   * (`query.limit`, `query.cursor`). Cada post incluye su autor y el flag
   * `likedByMe` para `currentUserId`. Devuelve un `PostsPageDto`.
   */

  async getProfilePosts(
    userId: string,
    currentUserId: string,
    query: ListPostsQueryDto,
  ): Promise<PostsPageDto> {
    const profileOwner = await this.users.findOne({ where: { id: userId } });
    if (!profileOwner) {
      throw new NotFoundException(`No existe el usuario ${userId}`);
    }

    const limit = query.limit ?? 10;
    const qb = this.posts
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.profileOwnerId = :userId', { userId })
      .orderBy('post.createdAt', 'DESC')
      .addOrderBy('post.id', 'DESC');

    if (query.cursor) {
      const { cursorDateStr, cursorId } = this.decodeProfilePostsCursor(
        query.cursor,
      );
      qb.andWhere('(post.createdAt, post.id) < (:cursorDate, :cursorId)', {
        cursorDate: new Date(cursorDateStr),
        cursorId,
      });
    }

    const rows = await qb.take(limit + 1).getMany();
    const hasMore = rows.length > limit;
    const pagePosts = hasMore ? rows.slice(0, limit) : rows;
    const likedPostIds = await this.findLikedPostIdsForUser(
      currentUserId,
      pagePosts.map((post) => post.id),
    );
    const items = pagePosts.map((post) =>
      PostDto.fromEntity(post, likedPostIds.has(post.id)),
    );

    const last = pagePosts.at(-1);
    const nextCursor =
      hasMore && last
        ? this.encodeProfilePostsCursor(last.createdAt, last.id)
        : null;

    const page = new PostsPageDto();
    page.items = items;
    page.nextCursor = nextCursor;
    return page;
  }

  private encodeProfilePostsCursor(createdAt: Date, id: string): string {
    const payload: ProfilePostsCursorPayload = {
      createdAt: createdAt.toISOString(),
      id,
    };
    return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
  }

  private decodeProfilePostsCursor(cursor: string): {
    cursorDateStr: string;
    cursorId: string;
  } {
    try {
      const json = Buffer.from(cursor, 'base64').toString('utf8');
      const payload = JSON.parse(json) as ProfilePostsCursorPayload;
      if (
        typeof payload.createdAt !== 'string' ||
        typeof payload.id !== 'string' ||
        payload.createdAt.length === 0 ||
        payload.id.length === 0
      ) {
        throw new Error('invalid cursor payload');
      }
      return { cursorDateStr: payload.createdAt, cursorId: payload.id };
    } catch {
      throw new BadRequestException('Cursor de paginación no válido.');
    }
  }

  private async findLikedPostIdsForUser(
    currentUserId: string,
    postIds: string[],
  ): Promise<Set<string>> {
    if (!currentUserId?.trim() || postIds.length === 0) {
      return new Set();
    }

    const rows = await this.likes
      .createQueryBuilder('like')
      .select('like.postId', 'postId')
      .where('like.userId = :userId', { userId: currentUserId })
      .andWhere('like.postId IN (:...postIds)', { postIds })
      .getRawMany<{ postId: string }>();

    return new Set(rows.map((row) => row.postId));
  }
}