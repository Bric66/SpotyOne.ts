import {UserRepository} from "../../repositories/UserRepository";
import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";


export type AddTrackInput = {
    trackId: string,
    trackTitle: string,
    userId: string
}


export class AddAlbumPropertiesToLibrary implements UseCase<AddTrackInput, User> {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(input: AddTrackInput): Promise<User> {

        const user = await this.userRepository.addAlbum({
            albumId: input.trackId,
            albumTitle: input.trackTitle,
            userId: input.userId
        })
        return Promise.resolve(user)
    }

}
