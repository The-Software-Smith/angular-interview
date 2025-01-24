import { IsString, IsOptional, MinLength } from 'class-validator';

export class SearchPoiDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  q: string;
}
