import {UserRepository} from "../../repositories/UserRepository";
import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
<<<<<<< HEAD


export type AddAlbumInput = {
    albumId: string,
    albumTitle: string,
    userId: string
}


export class AddAlbumPropertiesToLibrary implements UseCase<AddAlbumInput, User> {
=======
import {UserInput} from "./ConnectUser";

export type AlbumInput = {
    id: string,
    title: string,
}


export class AddAlbumPropertiesToLibrary implements UseCase<UserInput, User> {
>>>>>>> 172b8c6ea82d2386fdb8f30c049c32a3516b5fb6

    constructor(private readonly userRepository: UserRepository) {
    }

<<<<<<< HEAD
    async execute(input: AddAlbumInput): Promise<User> {

        const user = await this.userRepository.addAlbum({
            albumId: input.albumId,
            albumTitle: input.albumTitle,
            userId: input.userId
        })
        return Promise.resolve(user)
    }
=======
    async execute(input: User)
>>>>>>> 172b8c6ea82d2386fdb8f30c049c32a3516b5fb6

}
