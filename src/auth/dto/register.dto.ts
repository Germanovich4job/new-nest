import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  isNotEmpty,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;
}
