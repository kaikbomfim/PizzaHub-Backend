import { Injectable } from '@nestjs/common';
import { Comment, Pizza } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentDto): Promise<Comment> {
    const { pizzaId, ...rest } = data;
    return this.prisma.comment.create({
      data: {
        ...rest,
        pizza: { connect: { id: pizzaId } },
      },
    });
  }

  findMany(
    skip: number,
    take: number,
    pizzaId?: number,
  ): Promise<(Comment & { pizza: Pizza })[]> {
    return this.prisma.comment.findMany({
      where: pizzaId ? { pizzaId } : {},
      orderBy: { createdAt: 'desc' },
      include: { pizza: true },
      skip,
      take,
    });
  }

  findUnique(id: number): Promise<Comment & { pizza: Pizza }> {
    return this.prisma.comment.findUnique({
      where: { id },
      include: { pizza: true },
    });
  }

  update(
    id: number,
    data: UpdateCommentDto,
  ): Promise<Comment & { pizza: Pizza }> {
    return this.prisma.comment.update({
      where: { id },
      data,
      include: { pizza: true },
    });
  }

  delete(id: number): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id } });
  }
}
