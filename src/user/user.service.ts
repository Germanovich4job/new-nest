import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = this.hashPassword(createUserDto.password);
    const userData = { ...createUserDto, password: hashedPassword };

    const existingUserByUsername = await this.findByUsername(
      createUserDto.username,
    );
    if (existingUserByUsername) {
      throw new ConflictException(
        'Пользователь с таким никнеймом уже существует!',
      );
    }

    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует!');
    }

    const existingUserByPhone = await this.findByPhone(createUserDto.phone);
    if (existingUserByPhone) {
      throw new ConflictException(
        'Пользователь с таким номером телефона  уже существует!',
      );
    }

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((err) => {
        throw new BadRequestException(
          'Ошибка при создании нового пользователя!',
        );
      });

    const { password: _1, ...withoutPassword } = newUser;

    return withoutPassword;
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

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
