import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entity/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { IPayloadJwt } from './interfaces/auth.interface';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //   validate the user
  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    throw new BadRequestException('Invalid credentials!');
  }

  //     register
  public async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const userCheck = await this.usersService.getUserByEmail(
      registerUserDto.email,
    );
    if (userCheck) {
      throw new ConflictException(
        `User with email: ${registerUserDto.email} already exists!`,
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);
    try {
      const user = await this.usersService.registerUser({
        ...registerUserDto,
        password: hashedPassword,
      });
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // get auth token from cookie
  public getCookieWithToken(payload: IPayloadJwt) {
    const token = this.jwtService.sign(payload);
    return `Authorization=${token}; HttpOnly; Path=/; Max-Age=${process.env.JTW_EXPIRATION_TIME}`;
  }

  // clear cookie
  public clearCookie() {
    return `Authorization=;HttpOnly;Path=/;Max-Age=0`;
  }
  //     login
  //     verify user
  //     reset password
  //     resend OTP
}
