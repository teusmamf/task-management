import { Body, Controller, Post } from '@nestjs/common';
import { Userdto } from './dto/create-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor (
    private authService : AuthService
){}



@Post('/signup')
signUp(@Body() Userdto : Userdto ):Promise<void>{
 return this.authService.Signup(Userdto);
}


}
