import { Controller, Get, Res } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';

@Controller()
export class NodeMailerController {
  constructor(private readonly nodeMailerService: NodeMailerService) {}

  // @Get()
  // sendMailer(@Res() response: any) {
  //   const mail = this.nodeMailerService.sendVerificationCode();

  //   return response.status(200).json({
  //     message: 'success',
  //     mail,
  //   });
  // }
}
