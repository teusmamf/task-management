import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt} from 'passport-jwt';
import { UserRepository } from "./auth/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./auth/user.entity";
import { JwtPayload } from "./auth/jwt-payload.interface";


@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy){
    constructor(
    @InjectRepository(UserRepository)
    private usersRepository : UserRepository,
     ) {
        super({
            secretOrKey:'topsecret2604',
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
     }

     async validate(payload: JwtPayload):Promise<User>{
        const {username} = payload;
        const user : User = await this.usersRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
     }
}