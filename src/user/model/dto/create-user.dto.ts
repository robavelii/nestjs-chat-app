import { IsEmail, IsNotEmpty } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
