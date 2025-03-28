import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  userId: number;
}
