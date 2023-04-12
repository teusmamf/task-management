import { IsNotEmpty } from 'class-validator';

export class Userdto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
