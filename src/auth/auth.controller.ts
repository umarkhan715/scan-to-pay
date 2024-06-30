import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto, LogoutDto, VerificationDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('verification')
  verify(@Body() { email, oneTimePassword }: VerificationDto) {
    return this.authService.verify(email, oneTimePassword);
  }

  @Post('logout')
  logout(@Body() { email }: LogoutDto) {
    return this.authService.logout(email);
  }
}
