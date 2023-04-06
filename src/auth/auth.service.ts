import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Userdto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt'; 


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository : UserRepository,
    ){}

    async createUser(Userdto: Userdto):Promise<void>{

        const {username , password} = Userdto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(username);
        console.log(password);

        const user = this.userRepository.create({ username, password });
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


}
            

