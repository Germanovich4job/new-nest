import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    const existingUserByUsername = await this.userService.findByUsername(
      registerDto.username,
    );
    if (existingUserByUsername) {
      throw new ConflictException('Пользователь с таким email уже существует!');
    }

    const existingUserByEmail = await this.userService.findByEmail(
      registerDto.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует!');
    }

    const existingUserByPhone = await this.userService.findByPhone(
      registerDto.phone,
    );
    if (existingUserByPhone) {
      throw new ConflictException(
        'Пользователь с таким номером телефона  уже существует!',
      );
    }

    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  login() {
    return 'login';
  }
}
