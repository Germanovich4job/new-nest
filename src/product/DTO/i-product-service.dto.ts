import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

export interface IProductService {
  create(dto: CreateProductDto): Promise<string>;
  readOne(id: string): Promise<object>;
  readMany(): Promise<object[]>;
  update(id: string, dto: UpdateProductDto): Promise<void>;
  delete(id: string): Promise<void>;
}
