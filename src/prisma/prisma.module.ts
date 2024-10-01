import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'PRISMA_SERVICE',
      useClass: PrismaService,
    },
  ],
  exports: ['PRISMA_SERVICE'],
})
export class PrismaModule {}
