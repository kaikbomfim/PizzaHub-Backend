import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientService {
  findAllByPizzaId(pizzaId: number): string[] {
    const ingredients =
      {
        1: ['molho de tomate', 'mussarela', 'orégano', 'manjericão'],
        2: ['calabresa', 'azeitonas pretas', 'pimentões', 'mussarela', 'cogumelos'],
        3: ['mussarela', 'parmesão', 'gorgonzola', 'catupiry'],
        4: ['frango desfiado', 'catupiry', 'orégano', 'tomate'],
        5: ['tomate cereja', 'manjericão', 'mussarela fresca'],
        6: ['pepperoni', 'mussarela', 'molho de tomate', 'azeitonas'],
        7: ['presunto', 'abacaxi', 'mussarela', 'molho de tomate'],
        8: ['camarões', 'moluscos', 'peixe', 'molho branco', 'queijo'],
        9: ['cogumelos', 'pimentões', 'azeitonas', 'cebolas', 'mussarela'],
        10: ['pepperoni', 'molho de pimenta', 'mussarela extra', 'azeitonas'],
        11: ['bacon', 'cheddar', 'molho barbecue', 'mussarela'],
        12: ['frango grelhado', 'molho barbecue', 'cebolas caramelizadas', 'queijo'],
        13: ['presunto', 'cogumelos', 'calabresa', 'ovo', 'mussarela'],
        14: ['carne moída', 'jalapeños', 'molho picante', 'mussarela'],
      }[pizzaId] || [];
    return ingredients;
  }
}
