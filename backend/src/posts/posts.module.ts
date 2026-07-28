import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from '../likes/like.entity';
import { PostEntity } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, LikeEntity])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
