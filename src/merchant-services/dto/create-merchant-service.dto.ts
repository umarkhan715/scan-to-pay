import { ApiProperty } from '@nestjs/swagger';
import { MerchantService } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMerchantServiceDto implements MerchantService {
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  serviceName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  merchantId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  createdAt: Date;
  updatedAt: Date;
}
