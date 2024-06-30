import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { response } from 'express';
import { $Enums } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const bookingExits = await this.prisma.booking.findUnique({
      where: {
        id: createPaymentDto.bookingId,
      },
    });

    if (bookingExits) {
      const merchantServiceDetails =
        await this.prisma.merchantService.findUnique({
          where: {
            id: bookingExits.merchantServiceId,
          },
        });
      const createPayment = await this.prisma.payment.create({
        data: {
          amount: merchantServiceDetails.price,
          currency: createPaymentDto.currency,
          method: createPaymentDto.method,
          status: $Enums.PaymentStatus.PENDING,
          userId: bookingExits.userId,
          bookingId: createPaymentDto.bookingId,
          cardId: createPaymentDto.cardId,
        },
      });
      if (createPayment) {
        const user = await this.prisma.user.findUnique({
          where: {
            id: createPayment.userId,
          },
        });

        await this.prisma.notification.create({
          data: {
            message: `${
              user.firstName + ` ` + user.lastName
            } has requested for payment verification for service : ${
              bookingExits.service
            }`,
            userId: user.id,
            merchantId: bookingExits.merchantId,
          },
        });
        return createPayment;
      }
    } else {
      throw new NotFoundException('Booking Not Found');
    }
  }

  async findAll() {
    try {
      return await this.prisma.payment.findMany({});
    } catch (error) {
      console.log(error);
    }
  }

  async findAllUserPayments(id: number) {
    try {
      return await this.prisma.payment.findMany({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findBookingPayments(id: number) {
    try {
      return await this.prisma.payment.findMany({
        where: {
          bookingId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.payment.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const updateStatus = await this.prisma.payment.update({
      where: {
        id: id,
      },
      data: {
        status: updatePaymentDto.status,
      },
    });

    if (updateStatus) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: updateStatus.userId,
        },
      });
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: updateStatus.bookingId,
        },
      });

      const merchant = await this.prisma.merchant.findUnique({
        where: {
          id: booking.merchantId,
        },
      });

      await this.prisma.notification.create({
        data: {
          message: `${merchant.name} has ${updatePaymentDto.status} your payment for booking : ${booking.service}`,
          userId: user.id,
          merchantId: booking.merchantId,
        },
      });
      return updateStatus;
    } else {
      throw new NotFoundException('Payment Not Found');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.payment.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
