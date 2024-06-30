import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';

export class UpdatePaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: $Enums.PaymentStatus;
}
