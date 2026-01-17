import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  CreateAuthorDTO,
  ReadAuthorDTO,
  ReadManyAuthorsDTO,
  ReadManyAuthorsQueryDTO,
} from './dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}
  getMany(query: ReadManyAuthorsQueryDTO): Promise<ReadManyAuthorsDTO> {
    throw new NotImplementedException('А вот ты и попался, голубчик!');
  }
  getOne(authorId: string): Promise<ReadAuthorDTO> {
    throw new NotImplementedException(`Method not implemented ${authorId}`);
  }
  async create(data: CreateAuthorDTO): Promise<string> {
    const { id } = await this.prisma.author.create({
      data,
    });
    return id;
  }
  update(authorId: string, data: CreateAuthorDTO): Promise<void> {
    throw new NotImplementedException(`Method not implemented ${data}`);
  }
  delete(authorId: string): Promise<void> {
    throw new NotImplementedException(`Method not implemented ${authorId}`);
  }
}
