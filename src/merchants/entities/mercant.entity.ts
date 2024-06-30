import { ApiProperty } from '@nestjs/swagger';
import { Merchant } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class MercantEntity implements Merchant {
  constructor(partial: Partial<MercantEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
