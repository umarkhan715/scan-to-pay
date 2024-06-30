import { Module } from '@nestjs/common';
import { MerchantServicesService } from './merchant-services.service';
import { MerchantServicesController } from './merchant-services.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MerchantServicesController],
  providers: [MerchantServicesService, PrismaService],
})
export class MerchantServicesModule {}
