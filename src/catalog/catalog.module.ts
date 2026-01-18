import { Module } from '@nestjs/common';
import { AuthorsController } from 'src/authors/authors.controller';
import { AuthorsService } from 'src/authors/authors.service';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [AuthorsController, ProductController],
  providers: [AuthorsService, ProductService],
})
export class CatalogModule {}
