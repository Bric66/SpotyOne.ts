import {UserRepository} from "../../repositories/UserRepository";
import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";


export type RemoveTrackInput = {
    userId: string
}


export class RemoveTrackPropertiesToLibrary implements UseCase<RemoveTrackInput, User> {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(input: RemoveTrackInput): Promise<User> {

        const user = await this.userRepository.removeTrack({
            userId: input.userId
        })
        return Promise.resolve(user)
    }

}
