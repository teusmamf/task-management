import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class Userdto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string



    @IsNotEmpty()   
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: "password is too weak needs to have a special character (*,@) and a LOWER CASE LETTER ",
    })
    password:string
}