import {User} from "../Entities/User";
import {UserUpdatedInput} from "../Usecases/user/UpdateUser";
import {AddAlbumInput} from "../Usecases/user/AddAlbumPropertiesToLibrary";
import {AddTrackInput} from "../Usecases/user/AddTrackPropertiesToLibrary";
import {RemoveAlbumInput} from "../Usecases/user/RemoveAlbumPropertiesToLibrary";
import {RemoveTrackInput} from "../Usecases/user/RemoveTrackPropertiesToLibrary";

export interface UserRepository {
    create(input: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(userId: string): Promise<User>;

    delete(userId:string): string;

    addAlbum(input: AddAlbumInput): Promise<User>;

    removeAlbum(input: RemoveAlbumInput): Promise<User>;

    addTrack(input: AddTrackInput): Promise<User>;

    removeTrack(input: RemoveTrackInput): Promise<User>;
}