import {User} from "../Entities/User";
import {UserUpdatedInput} from "../Usecases/user/UpdateUser";

export interface UserRepository {
    create(userInput: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(id: string): Promise<User>;

    update(userInput: UserUpdatedInput): Promise<User>;

    deleteAlbum(userInput: User): Promise<User>;
}