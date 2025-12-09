import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ComplaintStatus, Priority } from 'src/generated/prisma/enums';


export class CreateComplaintDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  submittedById: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  assignedToId?: string;
}