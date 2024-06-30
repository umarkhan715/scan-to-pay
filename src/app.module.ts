import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MercantsModule } from './merchants/mercants.module';
import { MerchantServicesModule } from './merchant-services/merchant-services.module';
import { PaymentsModule } from './payments/payments.module';
import { BookingsModule } from './bookings/bookings.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NodeMailerModule } from './node-mailer/node-mailer.module';

import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    MercantsModule,
    MerchantServicesModule,
    PaymentsModule,
    BookingsModule,
    NotificationsModule,
    ReviewsModule,
    NodeMailerModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
