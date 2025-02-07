import { Injectable } from '@nestjs/common';
import { Company, Comment, Pizza } from '@prisma/client';
import { PizzaRepository } from './pizza.repository';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzaService {
  constructor(private readonly pizzaRepository: PizzaRepository) {}

  create(data: CreatePizzaDto): Promise<Pizza> {
    return this.pizzaRepository.create(data);
  }

  findAll(
    page: number,
    limit: number,
    companyId?: number,
    name?: string,
  ): Promise<(Pizza & { comments: Comment[]; company: Company })[]> {
    return this.pizzaRepository.findMany(
      (page - 1) * limit,
      limit,
      companyId,
      name,
    );
  }

  findOne(
    id: number,
  ): Promise<Pizza & { comments: Comment[]; company: Company }> {
    return this.pizzaRepository.findUnique(id);
  }

  update(
    id: number,
    data: UpdatePizzaDto,
  ): Promise<Pizza & { comments: Comment[]; company: Company }> {
    return this.pizzaRepository.update(id, data);
  }

  remove(id: number): Promise<Pizza> {
    return this.pizzaRepository.delete(id);
  }
}
