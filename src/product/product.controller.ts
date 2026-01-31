import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async readMany(): Promise<object[]> {
    return await this.service.readMany();
  }

  @Get(':id')
  async readOne(@Param('id') id: string): Promise<object> {
    return await this.service.readOne(id);
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<string> {
    return await this.service.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
