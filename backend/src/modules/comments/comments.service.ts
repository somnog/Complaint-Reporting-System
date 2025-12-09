import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        author: true,
        complaint: true,
      },
    });
  }

  async findByComplaint(complaintId: string) {
    return this.prisma.comment.findMany({
      where: { complaintId },
      include: {
        author: true,
      },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { author: true, complaint: true },
    });

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }

  async create(data: CreateCommentDto) {
    return this.prisma.comment.create({
      data,
      include: {
        author: true,
        complaint: true,
      },
    });
  }

  async update(id: string, data: UpdateCommentDto) {
    const exist = await this.prisma.comment.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Comment not found');

    return this.prisma.comment.update({
      where: { id },
      data,
      include: {
        author: true,
        complaint: true,
      },
    });
  }

  async remove(id: string) {
    const exist = await this.prisma.comment.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Comment not found');

    return this.prisma.comment.delete({ where: { id } });
  }
}
