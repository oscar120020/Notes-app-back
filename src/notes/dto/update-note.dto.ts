import { IsString, IsOptional, MinLength, MaxLength, IsUUID } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  content?: string;

  @IsUUID()
  @IsOptional()
  id?: string; 
} 