import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { User } from './user.entity';
import { Userdto } from './dto/create-user-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async createUser(userDto: Userdto): Promise<void> {
    const { username, password } = userDto;

    const user = new User();
    user.username = username;
    user.password = password;

    await this.save(user);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.findOne({where :{username}});
  }


}
