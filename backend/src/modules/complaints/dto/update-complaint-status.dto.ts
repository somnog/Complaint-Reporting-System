import { IsEnum } from 'class-validator';
import { ComplaintStatus } from 'src/generated/prisma/enums';

export class UpdateComplaintStatusDto {
  @IsEnum(ComplaintStatus)
  status: ComplaintStatus;
}
