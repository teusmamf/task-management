import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { jwtPayload } from "./jwt-interface";
import { User } from "./user.entity";
import { FindOneOptions } from "typeorm";


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
constructor(

    @InjectRepository(UserRepository)
    private UserRepository : UserRepository,
){
    super({
        secret:'topSecret2604',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
}

async validate(payload : jwtPayload):Promise<User>{
    const { username } = payload;
    const options: FindOneOptions<User> = {
      where: { username },
    };
    const user = await this.UserRepository.findOne(options);
  
    if(!user){

      throw new UnauthorizedException();

    }
  
    return user;
  }
  

}