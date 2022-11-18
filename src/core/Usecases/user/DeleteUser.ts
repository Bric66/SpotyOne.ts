import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";

export type UserDeletedInput = {

    userId: string
}

export class DeleteUser implements UseCase<UserDeletedInput, User> {

    constructor(private readonly userRepository: UserRepository){
    }

    async execute(input: UserDeletedInput): Promise<User> {

        const user = await this.userRepository.delete({
            userId: input.userId
        });

        return Promise.resolve(user);
    }
}