import {UseCase} from "../Usecase";
import {UserRepository} from "../../repositories/UserRepository";

export type UserDeletedInput = {
    userId: string
}

export class DeleteUser implements UseCase<UserDeletedInput, string> {

    constructor(private readonly userRepository: UserRepository) {
    }

   async execute(input:UserDeletedInput): Promise<string> {
        await this.userRepository.delete(input.userId);
        return (input.userId);
    }
}