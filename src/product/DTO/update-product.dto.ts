import {
  IsString,
  IsInt,
  IsPositive,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  // @IsString()
  id: string;
}
