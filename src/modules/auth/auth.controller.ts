import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { IRequestWithUser } from '../../common/global-interfaces/http.interface';
import { IPayloadJwt } from './interfaces/auth.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //     register user
  @Post()
  public async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.authService.registerUser(registerUserDto);
    const { password, ...rest } = user;
    return rest;
  }

  //   login user
  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async loginUser(@Req() req: IRequestWithUser, @Res() res: Response) {
    const { user } = req;
    const payload: IPayloadJwt = {
      userId: user.id,
      email: user.email,
    };
    const cookie = this.authService.getCookieWithToken(payload);
    res.setHeader('Set-Cookie', cookie);
    const { password, ...rest } = user;
    return res.send(rest);
  }

  // check authenticated user
  @Get()
  @UseGuards(JwtAuthGuard)
  public getAuthenticatedUser(@Req() req: IRequestWithUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = req.user;
    return rest;
  }

  // logout user
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  public async logout(@Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.clearCookie());
    return res.sendStatus(200);
  }
}
