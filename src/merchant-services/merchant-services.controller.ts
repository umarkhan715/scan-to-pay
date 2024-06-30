import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerchantServicesService } from './merchant-services.service';
import { CreateMerchantServiceDto } from './dto/create-merchant-service.dto';
import { UpdateMerchantServiceDto } from './dto/update-merchant-service.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('merchant-services')
@ApiTags('merchant-services')
export class MerchantServicesController {
  constructor(
    private readonly merchantServicesService: MerchantServicesService,
  ) {}

  @Post()
  create(@Body() createMerchantServiceDto: CreateMerchantServiceDto) {
    return this.merchantServicesService.create(createMerchantServiceDto);
  }

  @Get()
  findAll() {
    return this.merchantServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantServicesService.findOne(+id);
  }

  @Get('multiple-services/:id')
  @ApiOperation({
    summary: 'Users can get merchant services ',
    description:
      'This endpoint able user to get all services of a specific merchant.',
  })
  findMultipleServices(@Param('id') id: string) {
    return this.merchantServicesService.findMultipleServices(+id);
  }

  @Get('services-details/:id')
  @ApiOperation({
    summary: 'Users can get merchant service details',
    description:
      'This endpoint able user to get specific service detail of merchant.',
  })
  findServiceDetails(@Param('id') id: string) {
    return this.merchantServicesService.findServiceDetails(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantServiceDto: UpdateMerchantServiceDto,
  ) {
    return this.merchantServicesService.update(+id, updateMerchantServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantServicesService.remove(+id);
  }
}
