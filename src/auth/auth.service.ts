import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma';
import { RegisterDto } from './dto/register.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = this.hashPassword(registerDto.password);
    const userData = { ...registerDto, password: hashedPassword };
    const { resetPassword: _, ...withoutRepeatPasswordData } = userData;

    const newUser = await this.prismaService.user
      .create({
        data: withoutRepeatPasswordData,
      })
      .catch((err) => {
        throw new BadRequestException(
          'Ошибка при регистрации нового пользователя!',
        );
      });

    const { password: _1, ...withoutPassword } = newUser;

    return withoutPassword;
  }
  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
