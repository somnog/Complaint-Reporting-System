import { IsEnum } from 'class-validator';
import { Priority } from 'src/generated/prisma/enums';

export class UpdateComplaintPriorityDto {
  @IsEnum(Priority)
  priority: Priority;
}
