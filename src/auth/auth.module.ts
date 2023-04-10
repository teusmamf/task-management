import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt-strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret:'topSecret2604',
      signOptions:{
        expiresIn:3600,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService,UserRepository, jwtStrategy],
  controllers:[AuthController],
  exports:[jwtStrategy, PassportModule],
})
export class AuthModule {}
