import { IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  zoneId: number;

  @IsNumber()
  topicId: number;
}
