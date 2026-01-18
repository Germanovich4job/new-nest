import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import {
  CreateAuthorDTO,
  GetAuthorParams,
  ReadAuthorDTO,
  ReadManyAuthorsDTO,
  ReadManyAuthorsQueryDTO,
} from './dto';
import { randomUUID } from 'crypto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Get()
  getMany(
    @Query() query: ReadManyAuthorsQueryDTO,
  ): Promise<ReadManyAuthorsDTO> {
    return this.service.getMany(query);
  }

  @Get(':authorId')
  getOne(@Param() { authorId }: GetAuthorParams): Promise<ReadAuthorDTO> {
    return this.service.getOne(authorId);
  }

  @Post()
  async create(@Body() data: CreateAuthorDTO): Promise<CreateAuthorDTO> {
    const id = await this.service.create(data);
    return this.service.getOne(id);
  }

  @Put(':authorId')
  async update(
    @Param() { authorId }: GetAuthorParams,
    @Body() data: CreateAuthorDTO,
  ): Promise<ReadAuthorDTO> {
    await this.service.update(authorId, data);
    return this.service.getOne(authorId);
  }

  @Delete(':authorId')
  delete(@Param() { authorId }: GetAuthorParams): Promise<void> {
    return this.service.delete(authorId);
  }
}
