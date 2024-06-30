import { PartialType } from '@nestjs/swagger';
import { CreateMercantDto } from './create-mercant.dto';

export class UpdateMercantDto extends PartialType(CreateMercantDto) {}
