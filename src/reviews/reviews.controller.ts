import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateFeedBackDto, CreateReviewDto } from './dto/create-review.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Post()
  feedBackForMerchant(@Body() createFeedBackDto: CreateFeedBackDto) {
    return this.reviewsService.feedBackForMerchant(createFeedBackDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('merchant-feedback/:id')
  @ApiOperation({
    summary: 'Get all merchant feedbacks by merchant-id',
    description:
      'This endpoint returns a list of all feedback of a specific merchant.',
  })
  findAllMerchantFeedback(@Param('id') id: string) {
    return this.reviewsService.findAllMerchantFeedback(+id);
  }

  @Get('merchant-service-reviews/:id')
  @ApiOperation({
    summary: 'Get all feedbacks for a merchant service by merchant-service-id',
    description:
      'This endpoint returns a list of all feedback of a specific merchant service.',
  })
  findAllMerchantServiceReviews(@Param('id') id: string) {
    return this.reviewsService.findAllMerchantServiceReviews(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }
}
