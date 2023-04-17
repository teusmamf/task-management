import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { jwtPayload } from "./jwt-interface";
import { User } from "./user.entity";
import { FindOneOptions } from "typeorm";
import { AuthService } from "./auth.service";
import { log } from "console";


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
constructor(

    @InjectRepository(UserRepository)
    private UserRepository : UserRepository,
    
){
    super({
        secretOrKey:'topSecret2604',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
}

async validate(payload : jwtPayload): Promise<User>{
    const { username } = payload;
    console.log(this.UserRepository);
    
    const user: User = await this.UserRepository.findOne({
      where: { username : username }
    });

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}