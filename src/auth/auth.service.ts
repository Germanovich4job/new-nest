import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(registerDto: RegisterDto) {
    const createUserDto = registerDto;

    const { repeatPassword: _, ...withoutRepeatPassword } = createUserDto;
    const createdUser = this.userService.create(withoutRepeatPassword);
    return createdUser;
  }
}
