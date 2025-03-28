import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Point } from 'geojson';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsOptional()
  location?: Point;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
