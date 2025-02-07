import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PizzaController } from './pizza.controller';
import { PizzaRepository } from './pizza.repository';
import { PizzaService } from './pizza.service';
import { IngredientModule } from './ingredient/ingredient.module';
import { SizeModule } from './size/size.module';

@Module({
  controllers: [PizzaController],
  providers: [PizzaService, PizzaRepository],
  imports: [IngredientModule, PrismaModule, SizeModule],
})
export class PizzaModule {}
