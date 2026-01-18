import { Injectable } from '@nestjs/common';
import { IProductService } from './DTO/i-product-service.dto';

import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<string> {
    const createdProduct = await this.prisma.product.create({ data: dto });
    return createdProduct.id;
  }

  async readOne(id: string): Promise<object> {
    return await this.prisma.product.findUniqueOrThrow({ where: { id } });
  }

  async readMany(): Promise<object[]> {
    return await this.prisma.product.findMany();
  }

  async update(id: string, dto: UpdateProductDto): Promise<void> {
    await this.prisma.product.update({ where: { id }, data: dto });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
