import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Userdto } from './dto/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-interface';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private JwtService : JwtService,
    ){}

    
     CreateUser(Userdto: Userdto): Promise<void>{
        
        return this.userRepository.createUser(Userdto);
    }
    async signIn(Userdto : Userdto):Promise<{accessToken:String}>{
        const {username , password } = Userdto;
        const user = await this.userRepository.findOne({where : {username}})

        if(user && (await bcrypt.compare(password , user.password))){
            const payload : jwtPayload = {username};
            const accessToken = await this.JwtService.sign(payload);
            return {accessToken} ;

        }else{
            throw new UnauthorizedException('Please check your credentials');
        }

        
    }
    



}
            

