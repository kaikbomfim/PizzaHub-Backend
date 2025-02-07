import { Injectable } from '@nestjs/common';
import { Company, Pizza } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCompanyDto): Promise<Company> {
    return this.prisma.company.create({ data });
  }

  findMany(): Promise<(Company & { pizzas: Pizza[] })[]> {
    return this.prisma.company.findMany({
      orderBy: { name: 'asc' },
      include: { pizzas: true },
    });
  }

  findUnique(id: number): Promise<Company & { pizzas: Pizza[] }> {
    return this.prisma.company.findUnique({
      where: { id },
      include: { pizzas: true },
    });
  }

  update(
    id: number,
    data: UpdateCompanyDto,
  ): Promise<Company & { pizzas: Pizza[] }> {
    return this.prisma.company.update({
      where: { id },
      data,
      include: { pizzas: true },
    });
  }

  delete(id: number): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
