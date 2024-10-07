import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(4)
  password: string;
}
