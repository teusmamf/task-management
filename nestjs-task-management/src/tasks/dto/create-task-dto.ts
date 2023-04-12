import { IsNotEmpty } from 'class-validator';

export class createTaskdto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
