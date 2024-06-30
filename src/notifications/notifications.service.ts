import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.notification.findMany({});
  }

  async findAllNotificationsForUsers(id: number) {
    return await this.prisma.notification.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        message: true,
        userId: true,
        isRead: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async findAllNotificationsForMerchants(id: number) {
    return await this.prisma.notification.findMany({
      where: {
        merchantId: id,
      },
      select: {
        id: true,
        message: true,
        merchantId: true,
        isRead: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.notification.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return await this.prisma.notification.update({
      where: {
        id: id,
      },
      data: {
        isRead: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.notification.delete({
      where: {
        id: id,
      },
    });
  }
}
