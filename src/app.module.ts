import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { PrismaModule } from './prisma';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CatalogModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
