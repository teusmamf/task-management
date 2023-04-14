import { Body, Controller, Post } from '@nestjs/common';
import { Userdto } from './dto/create-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userdto: Userdto): Promise<void> {
    return this.authService.createUser(userdto);
  }

  @Post('/SignIn')
  SignIn(
    @Body() userdto : Userdto,
    ):Promise<{accessToken:string}>{
      return this.authService.signIn(userdto);
    }

}
