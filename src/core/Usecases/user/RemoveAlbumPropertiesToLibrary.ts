import {UserRepository} from "../../repositories/UserRepository";
import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";


export type RemoveAlbumInput = {
    userId: string
}


export class RemoveAlbumPropertiesToLibrary implements UseCase<RemoveAlbumInput, User> {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(input: RemoveAlbumInput): Promise<User> {

        const user = await this.userRepository.removeAlbum({
            userId: input.userId
        })
        return Promise.resolve(user)
    }

}
