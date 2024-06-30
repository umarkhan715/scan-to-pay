import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto implements Review {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  merchantId: number;
  merchantServiceId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  feedback: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bookingId: number;
}

export class CreateFeedBackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  feedback: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  merchantId: number;
}
