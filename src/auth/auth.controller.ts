import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);

    console.log(registerDto);
    const createdUser = this.authService.register(registerDto);
    return createdUser;
  }

  @Post('login')
  login() {
    return 'login';
  }
}
