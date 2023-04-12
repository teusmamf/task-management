import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Userdto } from './dto/create-user-dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {





    /*criando o usuário --------------\\\\---------*/
    
  async createUser(Userdto: Userdto): Promise<void> {
    const { username, password } = Userdto;
    console.log(
      'Creating user with username:',
      username,
      'and password:',
      password,
    );

    try {
      const user = await this.create({ username, password });
      console.log('Created user:', user);
      await this.save(user);
    } catch (error) {
      console.log('Error creating user:', error.message);
    }
  }
}
