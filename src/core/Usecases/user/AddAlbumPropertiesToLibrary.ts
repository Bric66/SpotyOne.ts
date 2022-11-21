import {UserRepository} from "../../repositories/UserRepository";
import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";

export type AddAlbumInput = {
    albumId: string,
    albumTitle: string,
    userId: string
}
export class AddAlbumPropertiesToLibrary implements UseCase<AddAlbumInput, User> {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(input: AddAlbumInput): Promise<User> {

        const user = await this.userRepository.addAlbum({
            albumId: input.albumId,
            albumTitle: input.albumTitle,
            userId: input.userId
        })
        return Promise.resolve(user)
    }

}