import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NodeMailerService } from 'src/node-mailer/node-mailer.service';
import { NodeMailerModule } from 'src/node-mailer/node-mailer.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, NodeMailerService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
