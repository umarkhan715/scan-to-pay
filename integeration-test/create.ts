import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  console.log('Registering user...');
  const roundsOfHashing = 10;

  const hashedPassword = await bcrypt.hash('Happy4You&', roundsOfHashing);
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      isAuthenticated: true,
      isAlreadyLoggedIn: true,
    },
  });

  console.log('User registered:');

  console.log('Autheticating user...');
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isAuthenticated: true,
    },
  });
  console.log('User Autheticated:');

  console.log('User signing in...');
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isAlreadyLoggedIn: true,
    },
  });
  console.log('User Signed In:');

  console.log('Adding cards for the user...');
  const card1 = await prisma.card.create({
    data: {
      provider: 'Visa',
      name: 'John Doe',
      number: '4111111111111111',
      expiryDate: new Date('2025-12-31'),
      cvc: 123,
      type: 'CREDIT_CARD',
      userId: user.id,
    },
  });
  console.log('Card 1 added:');

  await prisma.card.create({
    data: {
      provider: 'MasterCard',
      name: 'John Doe',
      number: '5500000000000004',
      expiryDate: new Date('2025-11-30'),
      cvc: 456,
      type: 'DEBIT_CARD',
      userId: user.id,
    },
  });
  console.log('Card 2 added:');

  console.log('Creating merchant...');
  const merchant = await prisma.merchant.create({
    data: {
      name: 'Best Services',
      email: 'merchant@example.com',
    },
  });
  console.log('Merchant created:');

  console.log('Creating services for the merchant...');
  const service1 = await prisma.merchantService.create({
    data: {
      serviceName: 'Cleaning',
      price: 100.0,
      merchantId: merchant.id,
    },
  });
  console.log('Service 1 created:');

  await prisma.merchantService.create({
    data: {
      serviceName: 'Gardening',
      price: 50.0,
      merchantId: merchant.id,
    },
  });
  console.log('Service 2 created:');

  console.log('Booking a service : Service:1...');
  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      merchantServiceId: service1.id,
      merchantId: merchant.id,
      service: 'Cleaning',
      status: 'COMPLETED',
    },
  });
  console.log(
    'Creating Notification for the merchant for booking service 1....',
  );
  await prisma.notification.create({
    data: {
      message: `${
        user.firstName + ` ` + user.lastName
      } has requested to book service ${service1.serviceName}`,
      merchantId: service1.merchantId,
    },
  });
  console.log('Notification created...');

  console.log('Booking verifing...');
  await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status: 'COMPLETED',
    },
  });
  console.log('Service booked:');

  console.log(
    'Creating Notification for the user approval of booking service 1....',
  );
  await prisma.notification.create({
    data: {
      message: `${merchant.name} has aprroved your booking for service ${service1.serviceName}`,
      userId: booking.userId,
    },
  });
  console.log('Notification created...');

  console.log('Creating payment using Card1...');
  const payment = await prisma.payment.create({
    data: {
      amount: 100.0,
      currency: 'USD',
      method: 'CREDIT_CARD',
      status: 'COMPLETED',
      userId: user.id,
      bookingId: booking.id,
      cardId: card1.id,
    },
  });
  console.log('Payment created:');

  console.log(
    'Creating Notification for the merchant for creation of payment for booking of service 1....',
  );
  await prisma.notification.create({
    data: {
      message: `${
        user.firstName + ` ` + user.lastName
      } has requested to initiate a payment for booking of service ${
        service1.serviceName
      }`,
      merchantId: booking.merchantId,
    },
  });
  console.log('Notification created...');

  console.log('Payment verifing...');
  await prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      status: 'COMPLETED',
    },
  });
  console.log('Payment Complet:');

  console.log(
    'Creating Notification for the merchant for creation of payment for booking of service 1....',
  );
  await prisma.notification.create({
    data: {
      message: `${merchant.name} has approved your payment for booking of service ${service1.serviceName}`,
      userId: payment.userId,
    },
  });
  console.log('Notification created...');

  console.log('Creating review...');
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Great service!',
      userId: user.id,
      merchantServiceId: service1.id,
      bookingId: booking.id,
    },
  });
  console.log('Review created:');

  console.log('Creating feedback...');
  await prisma.review.create({
    data: {
      rating: 5,
      feedback: 'Very satisfied with the cleaning service.',
      userId: user.id,
      merchantId: merchant.id,
    },
  });
  console.log('Feedback created:');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
