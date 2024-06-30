import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('user-notifications/:id')
  @ApiOperation({
    summary: 'Get all notifications for a specific user by user-id',
    description:
      'This endpoint returns a list of all nptifications of a specific user.',
  })
  findAllNotificationsForUsers(@Param('id') id: string) {
    return this.notificationsService.findAllNotificationsForUsers(+id);
  }

  @Get('merchant-notifications:id')
  @ApiOperation({
    summary: 'Get all notifications for a specific merchant by merchant-id',
    description:
      'This endpoint returns a list of all nptifications of a specific merchant.',
  })
  findAllNotificationsForMerchants(@Param('id') id: string) {
    return this.notificationsService.findAllNotificationsForMerchants(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
