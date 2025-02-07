import { Injectable } from '@nestjs/common';
import { Comment, Pizza } from '@prisma/client';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  create(data: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.create(data);
  }

  findAll(
    page: number,
    limit: number,
    pizzaId?: number,
  ): Promise<(Comment & { pizza: Pizza })[]> {
    return this.commentRepository.findMany(
      (page - 1) * limit,
      limit,
      pizzaId,
    );
  }

  findOne(id: number): Promise<Comment & { pizza: Pizza }> {
    return this.commentRepository.findUnique(id);
  }

  update(
    id: number,
    data: UpdateCommentDto,
  ): Promise<Comment & { pizza: Pizza }> {
    return this.commentRepository.update(id, data);
  }

  remove(id: number): Promise<Comment> {
    return this.commentRepository.delete(id);
  }
}
