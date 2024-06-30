import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodeMailerService {
  constructor(private readonly mailService: MailerService) {}

  sendVerificationCode(oneTimePassword: number, reciever: string) {
    console.log({ oneTimePassword });
    console.log({ reciever });
    const message = `Your one-time-password is ${oneTimePassword}`;

    this.mailService.sendMail({
      from: 'Umar Khan <umar.defence715@gmail.com>',
      to: reciever,
      subject: `Verify Yourself`,
      text: message,
    });
  }
}
