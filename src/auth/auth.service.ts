import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  register(registerDto: RegisterDto) {
    const { username, password, firstName, lastName, email, phone } =
      registerDto;

    return this.prismaService.user.create({
      data: {
        username,
        password,
        firstName,
        lastName,
        email,
        phone,
      },
    });
  }
}
