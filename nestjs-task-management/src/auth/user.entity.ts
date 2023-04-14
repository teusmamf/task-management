import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from "bcrypt";
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  async checkPassword(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    return match;
  }
}
