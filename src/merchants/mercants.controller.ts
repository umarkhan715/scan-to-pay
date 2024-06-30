import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MercantsService } from './mercants.service';
import { CreateMercantDto } from './dto/create-mercant.dto';
import { UpdateMercantDto } from './dto/update-mercant.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('mercants')
@ApiTags('mercants')
export class MercantsController {
  constructor(private readonly mercantsService: MercantsService) {}

  @Post()
  create(@Body() createMercantDto: CreateMercantDto) {
    return this.mercantsService.create(createMercantDto);
  }

  @Get()
  findAll() {
    return this.mercantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mercantsService.findOne(+id);
  }

  @Get(':id')
  merchantDetails(@Param('id') id: string) {
    return this.mercantsService.merchantDetails(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMercantDto: UpdateMercantDto) {
    return this.mercantsService.update(+id, updateMercantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mercantsService.remove(+id);
  }
}
