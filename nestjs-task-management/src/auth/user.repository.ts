import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { Userdto } from "./dto/create-user-dto";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(Userdto : Userdto): Promise<void>{
        const {username , password} = Userdto;
        // console.log(username);

        const user  = this.create({username,password});
        console.log(user);
        await this.save(user); 

        
    }
}
