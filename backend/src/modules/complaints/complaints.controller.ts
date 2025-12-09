import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from 'src/generated/prisma/enums';
import {
  CreateComplaintDto,
  UpdateComplaintStatusDto,
  UpdateComplaintAssignDto,
  UpdateComplaintPriorityDto,
  FilterComplaintsDto,
} from './dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly service: ComplaintsService) {}

  // Create complaint - CITIZEN only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CITIZEN)
  @Post()
  create(@Body() dto: CreateComplaintDto, @Req() req) {
    return this.service.create(dto, req.user.sub); // passing userId explicitly
  }

  // Get complaints list
  @UseGuards(JwtAuthGuard)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Req() req, @Query() filter: FilterComplaintsDto) {
    return this.service.findAll(req.user, filter); // passing full user object here
  }

  // Get single complaint by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.service.findOne(id, req.user);
  }

  // Update complaint status - OFFICIAL only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OFFICIAL)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateComplaintStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }

  // Assign complaint to official - OFFICIAL only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OFFICIAL)
  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body() dto: UpdateComplaintAssignDto) {
    return this.service.assign(id, dto.assignedToId);
  }

  // Update complaint priority - OFFICIAL only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OFFICIAL)
  @Patch(':id/priority')
  updatePriority(@Param('id') id: string, @Body() dto: UpdateComplaintPriorityDto) {
    return this.service.updatePriority(id, dto.priority);
  }
}
