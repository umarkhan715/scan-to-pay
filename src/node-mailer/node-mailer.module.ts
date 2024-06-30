import { Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { NodeMailerController } from './node-mailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [NodeMailerController],
  providers: [NodeMailerService],
})
export class NodeMailerModule {}
