import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Userdto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt'; 
import { throwError } from 'rxjs';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';


@EntityRepository(User)


export class UserRepository extends Repository<User>{
  
  async createUser(user : User): Promise<void> {
    
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async findOneByUsername(username: string): Promise<User> {
    return await this.findOne({where :{username}});
  }


}
