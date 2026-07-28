import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CurrentUserId } from '../common/current-user.decorator';
import { LikeResultDto } from './dto/like-result.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  like(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUserId() userId: string,
  ): Promise<LikeResultDto> {
    return this.postsService.like(id, userId);
  }

  @Delete(':id/like')
  @HttpCode(HttpStatus.OK)
  unlike(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUserId() userId: string,
  ): Promise<LikeResultDto> {
    return this.postsService.unlike(id, userId);
  }
}
