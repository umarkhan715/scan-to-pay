import { ApiProperty } from '@nestjs/swagger';
import { MerchantService } from '@prisma/client';

export class MercantEntity implements MerchantService {
  constructor(partial: Partial<MercantEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  serviceName: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  merchantId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
