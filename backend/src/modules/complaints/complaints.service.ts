import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { UserRole, ComplaintStatus, Priority } from 'src/generated/prisma/enums';
import { FilterComplaintsDto } from './dto/filter-complaints.dto';

@Injectable()
export class ComplaintsService {
  constructor(private readonly prisma: PrismaService) {}

  private generateReference() {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `CMP-${Date.now()}-${random}`;
  }

  async findAll(user: any, filter: FilterComplaintsDto) {
  const where: any = {};

  // Example role-based filtering:
  if (user.role === UserRole.CITIZEN) {
    where.submittedById = user.sub;
  }

  // Add filters if provided
  if (filter.status) where.status = filter.status;
  if (filter.categoryId) where.categoryId = filter.categoryId;
  if (filter.priority) where.priority = filter.priority;

  // Pagination defaults or from filter DTO
  const page = filter.page ?? 1;
  const limit = filter.limit ?? 20;

  const total = await this.prisma.complaint.count({ where });

  const complaints = await this.prisma.complaint.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    include: {
      submittedBy: true,
      assignedTo: true,
      category: true,
    },
  });

  return { data: complaints, meta: { total, page, limit } };
}

  async findOne(id: string, user: any) {
  const complaint = await this.prisma.complaint.findUnique({
    where: { id },
    include: {
      submittedBy: true,
      assignedTo: true,
      category: true,
      comments: true,
    },
  });

  if (!complaint) throw new NotFoundException(`Complaint with id ${id} not found`);

  // Authorization check for citizens
  if (user.role === UserRole.CITIZEN && complaint.submittedById !== user.sub) {
    throw new NotFoundException(`Complaint not found for this user`);
  }

  return complaint;
}
  async create(data: CreateComplaintDto, userId: string) {
  return this.prisma.complaint.create({
    data: {
      ...data,
      submittedById: userId,
      referenceNumber: this.generateReference(),
    },
    include: {
      submittedBy: true,
      assignedTo: true,
      category: true,
    },
  });
}
  async update(id: string, data: UpdateComplaintDto) {
    const existing = await this.prisma.complaint.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Complaint with id ${id} not found`);

    return this.prisma.complaint.update({
      where: { id },
      data,
      include: {
        submittedBy: true,
        assignedTo: true,
        category: true,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.complaint.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Complaint with id ${id} not found`);

    return this.prisma.complaint.delete({ where: { id } });
  }
  async updateStatus(id: string, status: ComplaintStatus) {
    const existing = await this.prisma.complaint.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Complaint with id ${id} not found`);

    return this.prisma.complaint.update({
      where: { id },
      data: { status },
      include: {
        submittedBy: true,
        assignedTo: true,
        category: true,
      },
    });
  }

  async assign(id: string, assignedToId: string) {
    const existing = await this.prisma.complaint.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Complaint with id ${id} not found`);

    return this.prisma.complaint.update({
      where: { id },
      data: { assignedToId },
      include: {
        submittedBy: true,
        assignedTo: true,
        category: true,
      },
    });
  }

  async updatePriority(id: string, priority: Priority) {
    const existing = await this.prisma.complaint.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Complaint with id ${id} not found`);

    return this.prisma.complaint.update({
      where: { id },
      data: { priority },
      include: {
        submittedBy: true,
        assignedTo: true,
        category: true,
      },
    });
  }
}
