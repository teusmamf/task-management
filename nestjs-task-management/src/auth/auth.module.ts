import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Jwtstrategy } from 'src/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({ 
      secret: 'topsecret2604',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    User
  ],
  providers: [AuthService,Jwtstrategy],
  controllers: [AuthController],
  exports:[Jwtstrategy,PassportModule]
})
export class AuthModule {}
