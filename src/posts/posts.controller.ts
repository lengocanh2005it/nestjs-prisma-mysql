import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGroupPostDto } from 'src/posts/dtos/create-group_post.dto';
import { CreatePostDto } from 'src/posts/dtos/create-post.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('POST_SERVICE') private readonly postService: PostsService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() { userId, ...createPostData }: CreatePostDto) {
    return this.postService.create(userId, createPostData);
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPosts(
    @Body() { userIds, ...createGroupPostData }: CreateGroupPostDto,
  ) {
    return this.postService.createGroup(userIds, createGroupPostData);
  }

  @Get('group')
  getGroupPosts() {
    return this.postService.getGroup();
  }
}
