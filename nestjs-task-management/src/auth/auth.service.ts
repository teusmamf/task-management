import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Userdto } from './dto/create-user-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,

  ) {}

  async createUser(Userdto: Userdto): Promise<void> {

    const { username, password } = Userdto;
    console.log(
      'Creating user with username:',
      username,
      'and password:',
      password,
    );

    try {
      const user = await this.userRepository.create({ username, password });
      console.log('Created user:', user);
      await this.userRepository.save(user);
    } catch (error) {
      console.log('Error creating user:', error.message);
    }
  }

  async signIn(userDto: Userdto): Promise<{ accessToken: string }> {
    const { username, password } = userDto;
    
    console.log(userDto);
    
    console.log(this.userRepository);
    
    const user: User = await this.userRepository.findOneByUsername(username);

    if (user && await user.checkPassword(password)) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}


