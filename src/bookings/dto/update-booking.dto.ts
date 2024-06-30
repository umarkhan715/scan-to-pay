import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsNotEmpty } from 'class-validator';
import { $Enums } from '@prisma/client';

export class UpdateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  status: $Enums.BookingStatus;
}
