import {UseCase} from "../Usecase";
import {UserRepository} from "../../repositories/UserRepository";

export class DeleteUser implements UseCase<string, string> {

    constructor(private readonly userRepository: UserRepository) {
    }

    execute(userId: string): string {
        this.userRepository.delete(userId);

        return (userId);
    }
}