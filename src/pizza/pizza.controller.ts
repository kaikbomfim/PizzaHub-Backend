import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { IngredientService } from './ingredient/ingredient.service';
import { SizeService } from './size/size.service';

@Controller('/pizza')
export class PizzaController {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly ingredientService: IngredientService,
    private readonly sizeService: SizeService,
  ) { }

  @Post('/')
  async create(@Body() data: CreatePizzaDto) {
    return await this.pizzaService.create(data);
  }

  @Get('/')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('companyId') companyId?: number,
    @Query('name') name?: string,
  ) {
    return await this.pizzaService.findAll(
      page || 1,
      limit || 20,
      companyId,
      name,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    const pizza = await this.pizzaService.findOne(id);
    const ingredients = this.ingredientService.findAllByPizzaId(id);
    const sizes = this.sizeService.findAllByPizzaId(id);
    return { ...pizza, ingredients, sizes };
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() data: UpdatePizzaDto) {
    return await this.pizzaService.update(id, data);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.pizzaService.remove(id);
  }
}
