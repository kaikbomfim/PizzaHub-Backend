import { Test, TestingModule } from '@nestjs/testing';
import { Comment, Company, Pizza } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PizzaRepository } from './pizza.repository';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

describe('PizzaService', () => {
  const companies = [{ id: 1 }, { id: 2 }];

  const pizzas = [
    {
      id: 1,
      companyId: companies[0].id,
      name: 'Napolitana',
      type: 'vegetariana',
      description:
        'Uma pizza tradicional com o sabor autêntico da Itália, coberta com molho de tomate, mussarela, orégano e manjericão fresco.',
      price: 28.0,
      image: 'pizza-1.png',
    },
    {
      id: 2,
      companyId: companies[1].id,
      name: 'Calabresa Suprema',
      type: 'de carne',
      description:
        'A clássica pizza de calabresa elevada a outro nível, com azeitonas pretas, pimentões e cogumelos frescos.',
      price: 30.0,
      image: 'pizza-2.png',
    },
  ];

  const validData = {
    name: 'Quatro Queijos',
    description:
      'Para os amantes de queijo, uma combinação irresistível de mussarela, parmesão, gorgonzola e catupiry.',
    price: 35.0,
  };

  const invalidData = {
    name: 0,
    description: 0,
  };

  let repository: PizzaRepository;
  let service: PizzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PizzaService,
        {
          provide: PizzaRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<PizzaRepository>(PizzaRepository);
    service = module.get<PizzaService>(PizzaService);
  });

  describe('create', () => {
    const pizza = pizzas[0];

    it('should create a new pizza', async () => {
      const data = pizza as CreatePizzaDto;

      const createdPizza = pizza as Pizza;

      jest.spyOn(repository, 'create').mockResolvedValue(createdPizza);

      const result = await service.create(data);

      expect(result).toEqual(createdPizza);
      expect(repository.create).toHaveBeenCalledWith(data);
    });
  });

  describe('find all', () => {
    const page = 1;
    const limit = pizzas.length;

    const skip = (page - 1) * limit;
    const take = limit;

    it('should return all pizzas', async () => {
      const foundPizzas = pizzas.map((pizza) => ({
        ...pizza,
        comments: [],
        company: {},
      })) as (Pizza & { comments: Comment[]; company: Company })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundPizzas);

      const result = await service.findAll(page, limit);

      expect(result).toEqual(foundPizzas);
      expect(repository.findMany).toHaveBeenCalledWith(
        skip,
        take,
        undefined,
        undefined,
      );
    });

    it('should return all pizzas by company id', async () => {
      const companyId = companies[0].id;

      const foundPizzas = pizzas
        .filter((pizza) => pizza.companyId === companyId)
        .map((pizza) => ({
          ...pizza,
          comments: [],
          company: {},
        })) as (Pizza & { comments: Comment[]; company: Company })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundPizzas);

      const result = await service.findAll(page, limit, companyId);

      expect(result).toEqual(foundPizzas);
      expect(repository.findMany).toHaveBeenCalledWith(
        skip,
        take,
        companyId,
        undefined,
      );
    });
  });

  describe('find one', () => {
    const pizza = pizzas[1];

    it('should return a single pizza', async () => {
      const { id } = pizza;

      const foundPizza = {
        ...pizza,
        comments: [],
        company: {},
      } as Pizza & { comments: Comment[]; company: Company };

      jest.spyOn(repository, 'findUnique').mockResolvedValue(foundPizza);

      const result = await service.findOne(id);

      expect(result).toEqual(foundPizza);
      expect(repository.findUnique).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const pizza = pizzas[0];

    it('should update an existing pizza', async () => {
      const { id } = pizza;
      const data = validData as UpdatePizzaDto;

      const updatedPizza = {
        ...pizza,
        ...data,
        comments: [],
        company: {},
      } as Pizza & { comments: Comment[]; company: Company };

      jest.spyOn(repository, 'update').mockResolvedValue(updatedPizza);

      const result = await service.update(id, data);

      expect(result).toEqual(updatedPizza);
      expect(repository.update).toHaveBeenCalledWith(id, data);
    });

    it('should return errors for invalid data', async () => {
      const data = plainToInstance(CreatePizzaDto, invalidData);

      const result = await validate(data);

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('remove', () => {
    const pizza = pizzas[1];

    it('should remove an existing pizza', async () => {
      const { id } = pizza;

      const deletedPizza = pizza as Pizza;

      jest.spyOn(repository, 'delete').mockResolvedValue(deletedPizza);

      const result = await service.remove(id);

      expect(result).toEqual(deletedPizza);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
