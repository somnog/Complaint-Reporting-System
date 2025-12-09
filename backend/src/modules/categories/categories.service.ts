import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryCreateDto } from './dto/category-create.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 20) {
    const count = await this.prisma.category.count({
    //   where: { deletedAt: null },
    });

    const categories = await this.prisma.category.findMany({
    //   where: { deletedAt: null },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { data: categories, meta: { total: count, page, limit } };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id, }, // deletedAt: null
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async create(data: CategoryCreateDto) {
    return this.prisma.category.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: Partial<CategoryCreateDto>) {
    const category = await this.prisma.category.findFirst({ where: { id,  } }); //deletedAt: null
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    return this.prisma.category.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findFirst({ where: { id } }); //deletedAt: null
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    return this.prisma.category.update({
      where: { id },
      data: {  }, //deletedAt: new Date()
      select: {
        id: true,
        name: true,
      },
    });
  }
}
