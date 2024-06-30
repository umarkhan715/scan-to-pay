import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Deleting reviews...');
  await prisma.review.deleteMany({});
  console.log('Reviews deleted.');

  console.log('Deleting payments...');
  await prisma.payment.deleteMany({});
  console.log('Payments deleted.');

  console.log('Deleting bookings...');
  await prisma.booking.deleteMany({});
  console.log('Bookings deleted.');

  console.log('Deleting merchant services...');
  await prisma.merchantService.deleteMany({});
  console.log('Merchant services deleted.');

  console.log('Deleting merchants...');
  await prisma.merchant.deleteMany({});
  console.log('Merchants deleted.');

  console.log('Deleting cards...');
  await prisma.card.deleteMany({});
  console.log('Cards deleted.');

  console.log('Deleting users...');
  await prisma.user.deleteMany({});
  console.log('Users deleted.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
