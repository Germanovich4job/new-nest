import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUsername(username: string) {
    return this.prismaService.user
      .findUnique({
        where: { username },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        const { password: _3, ...userWithoutPassword } = foundedUser;
        return userWithoutPassword;
      })
      .catch((error) => {
        throw new NotFoundException('Пользователь по никнейму не найден');
      });
  }

  async findByEmail(email: string) {
    return this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        const { password: _3, ...userWithoutPassword } = foundedUser;
        return userWithoutPassword;
      })
      .catch((error) => {
        throw new NotFoundException('Пользователь по email не найден');
      });
  }

  async findByPhone(phone: string) {
    return this.prismaService.user
      .findUnique({
        where: { phone },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        const { password: _3, ...userWithoutPassword } = foundedUser;
        return userWithoutPassword;
      })
      .catch((error) => {
        throw new NotFoundException(
          'Пользователь по номеру телефона не найден',
        );
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
