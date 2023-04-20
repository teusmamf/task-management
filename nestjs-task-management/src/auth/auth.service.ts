import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Userdto } from './dto/create-user-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,

  ) {}

  async createUser(userDto: Userdto): Promise<void> {
    const { username, password } = userDto;
    console.log('Creating user with username:', username, 'and password:', password);
  
    // Verifica se já existe um usuário com o mesmo nome de usuário
    const existingUser = await this.userRepository.findOne({ username });
    if (existingUser) {
      throw new UnauthorizedException('Usuario já existe');
    }
  
    // Gera um salt aleatório e usa-o para gerar um hash da senha
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Cria e salva o novo usuário com a senha salva como um hash
    const user = await this.userRepository.create({ username, password: hashedPassword });
    console.log('Created user:', user);
    await this.userRepository.save(user);
  }
  
  async signIn(userDto: Userdto): Promise<{ accessToken: string }> {
    const { username, password } = userDto;
    
    console.log(userDto);
    
    console.log(this.userRepository);
    
    const user : User = await this.userRepository.findOneByUsername(username);

    if (user && user.checkPassword(password)) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}


