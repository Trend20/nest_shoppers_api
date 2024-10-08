import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //   get all users
  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  //     get a single user
  public async getUserById(id: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  //     create a user
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  //     update a user
  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const newUser = Object.assign(user, updateUserDto);
    await this.userRepository.save(newUser);
    newUser.updatedAt = new Date();
    return newUser;
  }

  //     delete a user
  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
