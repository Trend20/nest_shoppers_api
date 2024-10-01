import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/CreateUserDto';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UsersService {
  //     define an empty users array
  private users: IUser[] = [];

  //   get all users
  public async getAll(): Promise<IUser[]> {
    return this.users;
  }

  //     get a single user
  public async getUserById(id: string): Promise<IUser> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  //     create a user
  public async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = {
      ...createUserDto,
      id: uuid(),
    };
    this.users.push(user);
    return user;
  }

  //     update a user
  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const user = await this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const newUser = Object.assign(user, updateUserDto);
    const userIndex = this.users.findIndex((user) => user.id === user.id);
    this.users[userIndex] = newUser;
    return newUser;
  }

  //     delete a user
  public async deleteUser(id: string): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex < 0 || userIndex >= 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
