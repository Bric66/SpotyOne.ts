import {User} from "../Entities/User";
import {UserUpdatedInput} from "../Usecases/user/UpdateUser";
<<<<<<< HEAD
import {UserDeletedInput} from "../Usecases/user/DeleteUser";
import {AddAlbumInput} from "../Usecases/user/AddAlbumPropertiesToLibrary";
import {AddTrackInput} from "../Usecases/user/AddTrackPropertiesToLibrary";
import {RemoveAlbumInput} from "../Usecases/user/RemoveAlbumPropertiesToLibrary";
import {RemoveTrackInput} from "../Usecases/user/RemoveTrackPropertiesToLibrary";

export interface UserRepository {
    create(input: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(userId: string): Promise<User>;

    update(input: UserUpdatedInput): Promise<User>;

    delete(input: UserDeletedInput): Promise<User>;

    addAlbum(input: AddAlbumInput): Promise<User>;

    removeAlbum(input: RemoveAlbumInput): Promise<User>;

    addTrack(input: AddTrackInput): Promise<User>;

    removeTrack(input: RemoveTrackInput): Promise<User>;


=======

export interface UserRepository {
    create(userInput: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(id: string): Promise<User>;

    update(userInput: UserUpdatedInput): Promise<User>;

    delete(userInput: User): Promise<User>;
>>>>>>> 172b8c6ea82d2386fdb8f30c049c32a3516b5fb6
}