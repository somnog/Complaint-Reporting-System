import { IsUUID } from 'class-validator';

export class UpdateComplaintAssignDto {
  @IsUUID()
  assignedToId: string;
}
