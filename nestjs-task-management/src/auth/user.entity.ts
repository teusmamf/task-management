import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from "bcrypt";
import { Task } from 'src/tasks/task-entity';
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
   
   
  @OneToMany(type => Task, task => task.user ,{eager:true})// eager represents that when we fecth the user we'll fecth the tasks, no need other line of code
  tasks : Task[];


}
