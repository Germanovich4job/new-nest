import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma';
import { RegisterDto } from './dto/register.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { error } from 'console';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    const createUserDto = registerDto;
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }
}
