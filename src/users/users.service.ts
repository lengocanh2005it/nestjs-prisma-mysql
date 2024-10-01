import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PRISMA_SERVICE') private readonly prismaService: PrismaService,
  ) {}

  create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            smsEnabled: true,
            notificationsOn: false,
          },
        },
      },
    });
  }

  get() {
    return this.prismaService.user.findMany({
      include: {
        userSetting: true,
      },
    });
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
        posts: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });
    if (!user) throw new HttpException('User Not Found', 404);
    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.getById(id);
    if (!user) throw new HttpException('User Not Found.', 404);

    if (data.username) {
      const findUser = await this.prismaService.user.findUnique({
        where: { username: data.username as string },
      });

      if (findUser) throw new HttpException('Username already taken.', 400);
    }

    return this.prismaService.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User Not Found.', 404);
    return this.prismaService.user.delete({ where: { id } });
  }

  async updateUserSettings(
    userId: number,
    data: Prisma.UserSettingUpdateInput,
  ) {
    const findUser = await this.getById(userId);

    if (!findUser) throw new HttpException('User Not Found', 404);

    if (!findUser.userSetting) throw new HttpException('Bad Request', 400);

    return this.prismaService.userSetting.update({
      where: { userId },
      data,
    });
  }
}
