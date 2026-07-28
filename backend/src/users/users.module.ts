import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from '../likes/like.entity';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity, LikeEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
