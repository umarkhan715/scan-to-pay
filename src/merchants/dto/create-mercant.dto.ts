import { ApiProperty } from '@nestjs/swagger';
import { Merchant } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMercantDto implements Merchant {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
