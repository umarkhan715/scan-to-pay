import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user?.isAlreadyLoggedIn) {
      throw new UnauthorizedException(
        `User already logged in from ${user.updatedAt}`,
      );
    }

    if (!user?.isAuthenticated) {
      throw new UnauthorizedException(`${email} is not verified`);
    }

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isAlreadyLoggedIn: true,
      },
    });
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async verify(email: string, oneTimePassword: number) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    } else {
      if (user.verficationCode === oneTimePassword) {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            verficationCode: null,
            isAuthenticated: true,
          },
        });
        return 'Successfully Verified';
      } else {
        throw new UnauthorizedException('Invalid Code');
      }
    }
  }

  async logout(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    } else {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isAlreadyLoggedIn: false,
        },
      });
      return 'Successfully Logged Out';
    }
  }
}
