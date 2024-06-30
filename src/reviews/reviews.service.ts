import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedBackDto, CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    const bookingDetails = await this.prisma.booking.findUnique({
      where: {
        id: createReviewDto.bookingId,
      },
    });
    if (!bookingDetails) {
      throw new NotFoundException('Booking Not Found');
    }
    return await this.prisma.review.create({
      data: {
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
        userId: bookingDetails.userId,
        merchantServiceId: bookingDetails.merchantServiceId,
        bookingId: bookingDetails.id,
      },
    });
  }

  async feedBackForMerchant(createFeedBackDto: CreateFeedBackDto) {
    const merchantDetails = await this.prisma.merchant.findUnique({
      where: {
        id: createFeedBackDto.merchantId,
      },
    });
    if (!merchantDetails) {
      throw new NotFoundException('Merchant Not Found');
    }
    return await this.prisma.review.create({
      data: {
        rating: createFeedBackDto.rating,
        feedback: createFeedBackDto.feedback,
        userId: createFeedBackDto.userId,
        merchantId: createFeedBackDto.merchantId,
      },
    });
  }

  async findAllMerchantFeedback(id: number) {
    return await this.prisma.review.findMany({
      where: {
        merchantId: id,
      },
      select: {
        userId: true,
        merchantId: true,
        rating: true,
        feedback: true,
        createdAt: true,
      },
    });
  }

  async findAllMerchantServiceReviews(id: number) {
    return await this.prisma.review.findMany({
      where: {
        merchantServiceId: id,
      },
      select: {
        userId: true,
        merchantService: true,
        rating: true,
        comment: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.review.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
  }
}
