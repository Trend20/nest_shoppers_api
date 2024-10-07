import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // getting all users
  @Get()
  public async getAllUsers(): Promise<IUser[]> {
    return this.usersService.getAllUsers();
  }

  //   getting a single user
  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<IUser> {
    return this.usersService.getUserById(id);
  }

  //   creating a new user
  @Post('/')
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUser> {
    return this.usersService.createUser(createUserDto);
  }

  //   updating an existing user
  @Put(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  //   deleting an existing user
  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
