import { IsString, IsInt, IsPositive, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  manufacturer: string;

  @IsUrl()
  imageUrl: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
