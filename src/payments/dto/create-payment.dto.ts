import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Payment } from '@prisma/client';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto implements Payment {
  amount: number;
  status: $Enums.PaymentStatus;
  userId: number;
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  method: $Enums.PaymentMethod;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  bookingId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cardId: number;

  createdAt: Date;
  updatedAt: Date;
}
