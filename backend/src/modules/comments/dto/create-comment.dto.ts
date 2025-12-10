import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? false : value))
  isInternal?: boolean;

  @IsString()
  @IsNotEmpty()
  complaintId: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
