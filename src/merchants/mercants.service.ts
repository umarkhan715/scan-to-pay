import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMercantDto } from './dto/create-mercant.dto';
import { UpdateMercantDto } from './dto/update-mercant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MercantsService {
  constructor(private prisma: PrismaService) {}
  async create(createMercantDto: CreateMercantDto) {
    try {
      const createMerchant = await this.prisma.merchant.create({
        data: {
          name: createMercantDto.name,
          email: createMercantDto.email,
        },
      });
      return createMerchant;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.merchant.findMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.merchant.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async merchantDetails(id: number) {
    try {
      return await this.prisma.merchant.findUnique({
        where: {
          id: id,
        },
        include: {
          reviews: {
            select: {
              rating: true,
              feedback: true,
              merchantId: true,
              createdAt: true,
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateMercantDto: UpdateMercantDto) {
    try {
      return this.prisma.merchant.update({
        where: { id },
        data: updateMercantDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.merchant.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
