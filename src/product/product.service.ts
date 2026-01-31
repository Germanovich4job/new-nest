import { Injectable } from '@nestjs/common';
import { IProductService } from './dto/i-product-service.dto';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

  async update(id: string, dto: UpdateProductDto): Promise<UpdateProductDto> {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: dto,
    });
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
