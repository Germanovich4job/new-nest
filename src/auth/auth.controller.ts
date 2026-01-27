import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { Public } from './guards/jwt-auth.guard';
import { Token } from 'generated/prisma/browser';
import dayjs from 'dayjs';
import type { Response } from 'express';
import { Cookies } from 'src/decorators/cookies.decorator';
import { access } from 'fs';
import { ITokens } from './interfaces/interfaces';

const REFRESH_TOKEN = 'refreshToken';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = this.authService.register(registerDto);

    if (!createdUser) {
      const textError = 'Ошибка при создании пользователя!';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }
    return createdUser;
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);

    if (!tokens) {
      const textError = 'Ошибка при попытке входа!';
      this.logger.error(textError);
    }

    this.setRefreshTokenToCookies(tokens, res);
  }

  @Get('refresh-tokens')
  async refreshTokens(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const tokens = await this.authService.refreshTokens(refreshToken);

    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.setRefreshTokenToCookies(tokens, res);
  }

  private setRefreshTokenToCookies(tokens: ITokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    const { token, expires } = tokens.refreshToken;

    const cookieExpTime = dayjs(expires).toDate();

    const cookieValue = token;

    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax' as 'lax' | 'strict' | 'none',
      secure: false,
      path: '/',
      expires: cookieExpTime,
    };

    res.cookie(REFRESH_TOKEN, cookieValue, cookieOptions);
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
