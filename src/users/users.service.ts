import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { NodeMailerService } from 'src/node-mailer/node-mailer.service';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private nodeMailer: NodeMailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (userExist) {
      throw new NotFoundException(
        `user already registered for: ${userExist.email}`,
      );
    }
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;
    const randomNumber = this.generateSixDigitRandomNumber();
    const saveUser = await this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        verficationCode: randomNumber,
        isAlreadyLoggedIn: false,
      },
    });
    if (saveUser) {
      this.nodeMailer.sendVerificationCode(randomNumber, saveUser.email);
      return saveUser;
    }
  }

  findAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new NotFoundException('No user found');
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`No user found for id: ${id}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(
          updateUserDto.password,
          roundsOfHashing,
        );
      }
      return this.prisma.user.update({ where: { id }, data: updateUserDto });
    } catch (error) {
      throw new NotFoundException(`No user found for id: ${id}`);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`No user found for id: ${id}`);
    }
  }

  generateSixDigitRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
