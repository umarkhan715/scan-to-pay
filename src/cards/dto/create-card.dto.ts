import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Card } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto implements Card {
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  expiryDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cvc: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: $Enums.PaymentMethod;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
