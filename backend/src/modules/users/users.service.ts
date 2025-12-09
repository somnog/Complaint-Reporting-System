import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 20) {
    const count = await this.prisma.user.count({
      where: { deletedAt: null },
    });

    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        address: true,
        role: true,
        department: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { data: users, meta: { total: count, page, limit } };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        address: true,
        role: true,
        department: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async create(data: UserCreateDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        address: true,
        role: true,
        department: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: Partial<UserCreateDto>) {
    const user = await this.prisma.user.findFirst({ where: { id, deletedAt: null } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        address: true,
        role: true,
        department: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id, deletedAt: null } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });
  }
}
