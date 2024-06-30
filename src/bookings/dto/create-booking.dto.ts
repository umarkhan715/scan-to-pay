import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Booking } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto implements Booking {
  service: string;
  status: $Enums.BookingStatus;
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  merchantServiceId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  merchantId: number;

  createdAt: Date;
  updatedAt: Date;
}
