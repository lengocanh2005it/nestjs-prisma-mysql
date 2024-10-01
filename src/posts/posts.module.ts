import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'POST_SERVICE',
      useClass: PostsService,
    },
  ],
  controllers: [PostsController],
})
export class PostsModule {}
