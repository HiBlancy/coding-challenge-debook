import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { CurrentUserId } from '../common/current-user.decorator';
import { ListPostsQueryDto } from '../posts/dto/list-posts-query.dto';
import { PostsPageDto } from '../posts/dto/post.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Header del perfil. */
  @Get(':id')
  getProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserProfileDto> {
    return this.usersService.getProfile(id);
  }

  /** Posts del tab "Convos" del perfil (paginado por cursor). */
  @Get(':id/posts')
  getProfilePosts(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUserId() currentUserId: string,
    @Query() query: ListPostsQueryDto,
  ): Promise<PostsPageDto> {
    return this.usersService.getProfilePosts(id, currentUserId, query);
  }
}
