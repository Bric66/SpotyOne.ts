import {User} from "../Entities/User";
import {UserUpdatedInput} from "../Usecases/user/UpdateUser";

export interface UserRepository {
    create(input: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(userId: string): Promise<User>;

    update (input: UserUpdatedInput) : Promise<User>;

    delete(userId:string): string;

}