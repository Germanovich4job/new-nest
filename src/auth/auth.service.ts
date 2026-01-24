import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userService: UserService) {}

  register(registerDto: RegisterDto) {
    const createUserDto = registerDto;

    const { repeatPassword: _, ...withoutRepeatPassword } = createUserDto;
    const createdUser = this.userService.create(withoutRepeatPassword);
    return createdUser;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email).catch((err) => {
      this.logger.error(err);
      return null;
    });

    if (!user) {
      const textError = 'Неверные логин или пароль';
      this.logger.error(textError);
      throw new UnauthorizedException(textError);
    }

    const isPasswordMatch = user?.password
      ? compareSync(password, user.password)
      : false;

    if (!isPasswordMatch) {
      const textError = 'Неверные логин или пароль';
      this.logger.error(textError);
      throw new UnauthorizedException(textError);
    }

    return user;
  }
}
