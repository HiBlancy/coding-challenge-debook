import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LikeEntity } from '../likes/like.entity';
import { LikeResultDto } from './dto/like-result.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly posts: Repository<PostEntity>,
    @InjectRepository(LikeEntity)
    private readonly likes: Repository<LikeEntity>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * 🚧 TODO — `POST /v1/posts/:id/like`.
   * Devuelve el estado final (`LikeResultDto`).
   */
  async like(postId: string, userId: string): Promise<LikeResultDto> {
    void postId;
    void userId;
    throw new NotImplementedException(
      'TODO: implementa PostsService.like (POST /v1/posts/:id/like)',
    );
  }

  /**
   * 🚧 TODO — `DELETE /v1/posts/:id/like`.
   * Devuelve el estado final (`LikeResultDto`).
   */
  async unlike(postId: string, userId: string): Promise<LikeResultDto> {
    void postId;
    void userId;
    throw new NotImplementedException(
      'TODO: implementa PostsService.unlike (DELETE /v1/posts/:id/like)',
    );
  }
}
