import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { PrismaModule } from './prisma';

@Module({
  imports: [CatalogModule, PrismaModule],
})
export class AppModule {}
