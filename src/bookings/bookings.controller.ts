import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bookings')
@ApiTags('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User can register a booking',
    description:
      'This endpoint able user to register a bokking for a merchant service.',
  })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get('user-bookings/:id')
  @ApiOperation({
    summary: 'Get all bookings for a specific user by user-id',
    description:
      'This endpoint returns a list of all bookings of a specific user.',
  })
  findAllUsersBooking(@Param('id') id: string) {
    return this.bookingsService.findAllUsersBooking(+id);
  }

  @Get('merchant-bookings/:id')
  @ApiOperation({
    summary: 'Get all bookings for a specific merchant by merchant-id',
    description:
      'This endpoint returns a list of all bookings of a specific merchant.',
  })
  findAllMerchantBooking(@Param('id') id: string) {
    return this.bookingsService.findAllMerchantBooking(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Merchant can update booking status',
    description:
      'This endpoint will able to update the booking status of a booking by merchant.',
  })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
