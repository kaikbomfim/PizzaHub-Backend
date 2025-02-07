import { Injectable } from '@nestjs/common';

@Injectable()
export class SizeService {
  findAllByPizzaId(pizzaId: number): {
    Pequena?: number;
    Média?: number;
    Grande?: number;
  } {
    const sizes =
      {
        1: { Pequena: 28, Média: 38, Grande: 48 },
        2: { Pequena: 30.0, Média: 40.0, Grande: 50.0 },
        3: { Pequena: 35.0, Média: 45.0, Grande: 55.0 },
        4: { Pequena: 33.0, Média: 43.0, Grande: 53.0 },
        5: { Pequena: 25.0, Média: 35.0, Grande: 45.0 },
        6: { Pequena: 32.0, Média: 42.0, Grande: 52.0 },
        7: { Pequena: 28.0, Média: 38.0, Grande: 48.0 },
        8: { Pequena: 40.0, Média: 50.0, Grande: 60.0 },
        9: { Pequena: 33.0, Média: 43.0, Grande: 53.0 },
        10: { Pequena: 35.0, Média: 45.0, Grande: 55.0 },
        11: { Pequena: 38.0, Média: 48.0, Grande: 58.0 },
        12: { Pequena: 34.0, Média: 44.0, Grande: 54.0 },
        13: { Pequena: 36.0, Média: 46.0, Grande: 56.0 },
        14: { Pequena: 37.0, Média: 47.0, Grande: 57.0 },
      }[pizzaId] || {};
    return sizes;
  }
}
