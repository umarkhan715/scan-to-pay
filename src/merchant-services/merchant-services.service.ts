import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMerchantServiceDto } from './dto/create-merchant-service.dto';
import { UpdateMerchantServiceDto } from './dto/update-merchant-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MerchantServicesService {
  constructor(private prisma: PrismaService) {}
  async create(createMerchantServiceDto: CreateMerchantServiceDto) {
    try {
      const merchantExists = await this.prisma.merchant.findUnique({
        where: {
          id: createMerchantServiceDto.merchantId,
        },
      });
      if (!merchantExists) {
        throw new NotFoundException(`${merchantExists} is not verified`);
      }
      return await this.prisma.merchantService.create({
        data: {
          merchantId: createMerchantServiceDto.merchantId,
          serviceName: createMerchantServiceDto.serviceName,
          price: createMerchantServiceDto.price,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.merchantService.findMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async findMultipleServices(id: number) {
    try {
      return await this.prisma.merchantService.findMany({
        where: {
          merchantId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.merchantService.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findServiceDetails(id: number) {
    try {
      return await this.prisma.merchantService.findUnique({
        where: {
          id: id,
        },
        include: {
          Booking: {
            include: {
              payment: true,
              review: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateMerchantServiceDto: UpdateMerchantServiceDto) {
    try {
      return await this.prisma.merchantService.update({
        where: { id },
        data: updateMerchantServiceDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.merchantService.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
