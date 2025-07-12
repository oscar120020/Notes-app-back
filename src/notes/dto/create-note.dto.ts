import {
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateNoteDto {

  @IsUUID()
  @IsOptional()
  id?: string; 

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  content: string;
}
