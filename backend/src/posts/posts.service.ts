import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { LikeEntity } from '../likes/like.entity';
import { LikeResultDto } from './dto/like-result.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly posts: Repository<PostEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async like(postId: string, userId: string): Promise<LikeResultDto> {
    return this.dataSource.transaction(async (manager) => {
      const post = await manager.findOne(PostEntity, { where: { id: postId } });
      if (!post) {
        throw new NotFoundException(`No existe el post ${postId}`);
      }

      const existingLike = await manager.findOne(LikeEntity, {
        where: { userId, postId },
      });

      if (!existingLike) {
        const like = manager.create(LikeEntity, { userId, postId });
        await manager.save(LikeEntity, like);
        await manager.increment(PostEntity, { id: postId }, 'likesCount', 1);
      }

      const updatedPost = await manager.findOne(PostEntity, {
        where: { id: postId },
        select: { id: true, likesCount: true },
      });
      if (!updatedPost) {
        throw new NotFoundException(`No existe el post ${postId}`);
      }

      return {
        postId,
        likedByMe: true,
        likesCount: updatedPost.likesCount,
      };
    });
  }

  async unlike(postId: string, userId: string): Promise<LikeResultDto> {
    return this.dataSource.transaction(async (manager) => {
      const post = await manager.findOne(PostEntity, { where: { id: postId } });
      if (!post) {
        throw new NotFoundException(`No existe el post ${postId}`);
      }

      const deleteResult = await manager
        .createQueryBuilder()
        .delete()
        .from(LikeEntity)
        .where('userId = :userId', { userId })
        .andWhere('postId = :postId', { postId })
        .execute();

      if ((deleteResult.affected ?? 0) > 0) {
        await manager.decrement(
          PostEntity,
          { id: postId, likesCount: MoreThan(0) },
          'likesCount',
          1,
        );
      }

      const updatedPost = await manager.findOne(PostEntity, {
        where: { id: postId },
        select: { id: true, likesCount: true },
      });
      if (!updatedPost) {
        throw new NotFoundException(`No existe el post ${postId}`);
      }

      return {
        postId,
        likedByMe: false,
        likesCount: updatedPost.likesCount,
      };
    });
  }
}
