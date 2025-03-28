import { IsString, IsNumber } from 'class-validator';
import { Point } from 'geojson';

export class CreateZoneDto {
  @IsString()
  title: string;

  center: Point;

  @IsNumber()
  radio: number;

  @IsNumber()
  userId: number;
}
