import {UserRepository} from "../../repositories/UserRepository";
import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserInput} from "./ConnectUser";

export type AlbumInput = {
    id: string,
    title: string,
}


export class AddAlbumPropertiesToLibrary implements UseCase<UserInput, User> {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(input: User)

}
