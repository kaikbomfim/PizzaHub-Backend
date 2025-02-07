import { Test, TestingModule } from '@nestjs/testing';
import { Comment, Pizza } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentService', () => {
  const pizzas = [{ id: 1 }, { id: 2 }];

  const comments = [
    {
      id: 1,
      pizzaId: pizzas[0].id,
      authorName: 'David Santana',
      authorEmail: 'davidsantana@gmail.com',
      content:
        'A pizza Napolitana é maravilhosa! A combinação de manjericão com molho de tomate é simplesmente perfeita.',
    },
    {
      id: 2,
      pizzaId: pizzas[1].id,
      authorName: 'Luis Paulo',
      authorEmail: 'luispcarvalho@gmail.com',
      content:
        'Adorei a pizza! A crocância da massa e o sabor dos ingredientes frescos fazem toda a diferença.',
    },
  ];

  const validData = {
    content:
      'Eu sou fã de pizzas vegetarianas, e essa Napolitana superou minhas expectativas. Deliciosa!',
  };

  const invalidData = {
    content: 0,
  };

  let repository: CommentRepository;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
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

    repository = module.get<CommentRepository>(CommentRepository);
    service = module.get<CommentService>(CommentService);
  });

  describe('create', () => {
    const comment = comments[0];

    it('should create a new comment', async () => {
      const data = comment as CreateCommentDto;

      const createdComment = comment as Comment;

      jest.spyOn(repository, 'create').mockResolvedValue(createdComment);

      const result = await service.create(data);

      expect(result).toEqual(createdComment);
      expect(repository.create).toHaveBeenCalledWith(data);
    });
  });

  describe('find all', () => {
    const page = 1;
    const limit = comments.length;

    const skip = (page - 1) * limit;
    const take = limit;

    it('should return all comments', async () => {
      const foundCommentaries = comments.map((comment) => ({
        ...comment,
        pizza: {},
      })) as (Comment & { pizza: Pizza })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundCommentaries);

      const result = await service.findAll(page, limit);

      expect(result).toEqual(foundCommentaries);
      expect(repository.findMany).toHaveBeenCalledWith(skip, take, undefined);
    });

    it('should return all comments by pizza id', async () => {
      const pizzaId = pizzas[0].id;

      const foundCommentaries = comments
        .filter((comment) => comment.pizzaId === pizzaId)
        .map((comment) => ({
          ...comment,
          pizza: {},
        })) as (Comment & { pizza: Pizza })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundCommentaries);

      const result = await service.findAll(page, limit, pizzaId);

      expect(result).toEqual(foundCommentaries);
      expect(repository.findMany).toHaveBeenCalledWith(skip, take, pizzaId);
    });
  });

  describe('find one', () => {
    const comment = comments[1];

    it('should return a single comment', async () => {
      const { id } = comment;

      const foundComment = {
        ...comment,
        pizza: {},
      } as Comment & { pizza: Pizza };

      jest.spyOn(repository, 'findUnique').mockResolvedValue(foundComment);

      const result = await service.findOne(id);

      expect(result).toEqual(foundComment);
      expect(repository.findUnique).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const comment = comments[0];

    it('should update an existing comment', async () => {
      const { id } = comment;
      const data = validData as UpdateCommentDto;

      const updatedComment = {
        ...comment,
        ...data,
        pizza: {},
      } as Comment & { pizza: Pizza };

      jest.spyOn(repository, 'update').mockResolvedValue(updatedComment);

      const result = await service.update(id, data);

      expect(result).toEqual(updatedComment);
      expect(repository.update).toHaveBeenCalledWith(id, data);
    });

    it('should return errors for invalid data', async () => {
      const data = plainToInstance(CreateCommentDto, invalidData);

      const result = await validate(data);

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('remove', () => {
    const comment = comments[1];

    it('should remove an existing comment', async () => {
      const { id } = comment;

      const deletedComment = comment as Comment;

      jest.spyOn(repository, 'delete').mockResolvedValue(deletedComment);

      const result = await service.remove(id);

      expect(result).toEqual(comment);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
