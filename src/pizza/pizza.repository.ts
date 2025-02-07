import { Injectable } from '@nestjs/common';
import { Comment, Company, Pizza } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzaRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePizzaDto): Promise<Pizza> {
    const { companyId, ...rest } = data;
    return this.prisma.pizza.create({
      data: {
        ...rest,
        company: { connect: { id: companyId } },
      },
    });
  }

  findMany(
    skip: number,
    take: number,
    companyId?: number,
    name?: string,
  ): Promise<(Pizza & { comments: Comment[]; company: Company })[]> {
    return this.prisma.pizza.findMany({
      where: {
        AND: [
          companyId ? { companyId } : {},
          name ? { name: { contains: name } } : {},
        ],
      },
      orderBy: { name: 'asc' },
      include: { comments: true, company: true },
      skip,
      take,
    });
  }

  findUnique(
    id: number,
  ): Promise<Pizza & { comments: Comment[]; company: Company }> {
    return this.prisma.pizza.findUnique({
      where: { id },
      include: { comments: true, company: true },
    });
  }

  update(
    id: number,
    data: UpdatePizzaDto,
  ): Promise<Pizza & { comments: Comment[]; company: Company }> {
    return this.prisma.pizza.update({
      where: { id },
      data,
      include: { comments: true, company: true },
    });
  }

  delete(id: number): Promise<Pizza> {
    return this.prisma.pizza.delete({ where: { id } });
  }
}
