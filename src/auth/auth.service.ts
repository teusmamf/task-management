import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Userdto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-interface';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository : UserRepository,
        private JwtService : JwtService,
    ){}

    async createUser(Userdto: Userdto):Promise<void>{

        const {username , password} = Userdto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(username);
        console.log(password);

        const user = this.userRepository.create({ username, password:hashedPassword });
        console.log(user);
        
        try{
            await this.userRepository.save(user); 
            console.log(23505);
            
        }catch(error ){
            if(error.code === "23505"){
                throw new ConflictException("Username already exists");
            }else {
                throw new InternalServerErrorException();
            }
        }
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
            

