import { Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

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

  login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    return;
  }
}
