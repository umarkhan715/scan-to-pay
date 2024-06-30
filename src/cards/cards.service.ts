import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}
  async create(createCardDto: CreateCardDto) {
    return await this.prisma.card.create({
      data: createCardDto,
    });
  }

  async findAllUserCards(id: number) {
    return await this.prisma.card.findMany({
      where: {
        userId: id,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.card.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    return await this.prisma.card.update({
      where: {
        id: id,
      },
      data: {
        name: updateCardDto.name,
        number: updateCardDto.number,
        expiryDate: updateCardDto.expiryDate,
        provider: updateCardDto.provider,
        cvc: updateCardDto.cvc,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.card.delete({
      where: {
        id: id,
      },
    });
  }
}
