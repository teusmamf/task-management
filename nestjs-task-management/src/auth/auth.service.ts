import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Userdto } from './dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async Signup(Userdto: Userdto): Promise<void> {
    return this.userRepository.createUser(Userdto);
  }
}
