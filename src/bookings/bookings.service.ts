import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}
  async create(createBookingDto: CreateBookingDto) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        id: createBookingDto.userId,
      },
    });
    if (!userExist) {
      throw new NotFoundException('User Not Found');
    }
    const merchantServiceExist = await this.prisma.merchantService.findUnique({
      where: {
        id: createBookingDto.merchantServiceId,
      },
    });
    if (!merchantServiceExist) {
      throw new NotFoundException('Merchant Not Found');
    }
    const createBooking = await this.prisma.booking.create({
      data: {
        userId: createBookingDto.userId,
        merchantServiceId: createBookingDto.merchantServiceId,
        merchantId: createBookingDto.merchantId,
        service: merchantServiceExist.serviceName,
        status: $Enums.BookingStatus.PENDING,
      },
    });
    if (createBooking) {
      await this.prisma.notification.create({
        data: {
          message: `${
            userExist.firstName + ` ` + userExist.lastName
          } has requested to book ${merchantServiceExist.serviceName} `,
          userId: userExist.id,
          merchantId: merchantServiceExist.merchantId,
          isRead: false,
        },
      });
    }
    return createBooking;
  }

  async findAll() {
    try {
      return await this.prisma.booking.findMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async findAllUsersBooking(id: number) {
    try {
      return await this.prisma.booking.findMany({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAllMerchantBooking(id: number) {
    try {
      return await this.prisma.booking.findMany({
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
      return await this.prisma.booking.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const updateStatus = await this.prisma.booking.update({
      where: {
        id: id,
      },
      data: {
        status: updateBookingDto.status,
      },
    });
    if (updateStatus) {
      const merchant = await this.prisma.merchant.findUnique({
        where: {
          id: updateStatus.merchantId,
        },
      });
      await this.prisma.notification.create({
        data: {
          message: `${merchant.name} has ${updateBookingDto.status} your booking for ${updateStatus.service}`,
          userId: updateStatus.userId,
          merchantId: updateStatus.merchantId,
        },
      });
      return updateStatus;
    } else {
      throw new NotFoundException('Booking Not Found');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.booking.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
