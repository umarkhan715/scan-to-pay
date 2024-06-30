import { PartialType } from '@nestjs/swagger';
import { CreateMerchantServiceDto } from './create-merchant-service.dto';

export class UpdateMerchantServiceDto extends PartialType(
  CreateMerchantServiceDto,
) {}
