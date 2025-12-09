import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsOptional()
  isInternal?: boolean = false;

  @IsString()
  @IsNotEmpty()
  complaintId: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
