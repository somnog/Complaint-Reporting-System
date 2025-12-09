import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintsController } from './complaints.controller';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from 'src/generated/prisma/enums';

describe('ComplaintsController', () => {
  let controller: ComplaintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplaintsController],
    }).compile();

    controller = module.get<ComplaintsController>(ComplaintsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
