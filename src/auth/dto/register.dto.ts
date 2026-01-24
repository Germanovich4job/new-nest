import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';
import { Role } from 'generated/prisma/enums';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  // @IsStrongPassword(
  //   {},
  //   {
  //     message:
  //       'Пароль повторный должен содержать цифры, заглавные и строчные буквы, а так же специальные символы',
  //   },
  // )
  // @IsString()
  // @MinLength(8, {
  //   message: 'Пароль повторный должен содержать ровно 8 символов',
  // })
  repeatPassword: string;
}
