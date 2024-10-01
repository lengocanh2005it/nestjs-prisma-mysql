import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(
    @Inject('PRISMA_SERVICE') private readonly prismaService: PrismaService,
  ) {}

  create(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prismaService.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  createGroup(
    userIds: number[],
    data: Prisma.GroupPostCreateWithoutUsersInput,
  ) {
    return this.prismaService.groupPost.create({
      data: {
        ...data,
        users: {
          create: userIds.map((userId) => ({ userId })),
        },
      },
    });
  }

  getGroup() {
    return this.prismaService.groupPost.findMany({
      include: {
        users: {
          select: {
            user: true,
          },
        },
      },
    });
  }
}
