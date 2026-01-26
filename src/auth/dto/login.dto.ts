import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPasswordsConstraint } from 'src/validators/match-passwords-constraint';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString({ message: 'Пароль должен строкой' })
  password: string;
}
