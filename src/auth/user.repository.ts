import { EntityRepository, Repository ,getRepository } from "typeorm";
import { User } from "./user.entity";
import { Userdto } from "./dto/create-user-dto";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

}
