import { Module } from '@nestjs/common';
import { MercantsService } from './mercants.service';
import { MercantsController } from './mercants.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MercantsController],
  providers: [MercantsService, PrismaService],
})
export class MercantsModule {}
