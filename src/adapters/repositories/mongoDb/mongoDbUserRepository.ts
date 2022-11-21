import {UserRepository} from "../../../core/repositories/UserRepository";
import {User, UserProperties} from "../../../core/Entities/User";
import {AddAlbumInput} from "../../../core/Usecases/user/AddAlbumPropertiesToLibrary";
import {RemoveAlbumInput} from "../../../core/Usecases/user/RemoveAlbumPropertiesToLibrary";
import {AddTrackInput} from "../../../core/Usecases/user/AddTrackPropertiesToLibrary";
import {RemoveTrackInput} from "../../../core/Usecases/user/RemoveTrackPropertiesToLibrary";
import {UserModel} from "./models/user";

export class mongoDbUserRepository implements UserRepository {

    async create(user: User): Promise<User> {
        const userModel = new UserModel(user.props);
        await userModel.save().then(() => console.log('User created successfully'));
        return Promise.resolve(user);
    }

    async getByEmail(email: string): Promise<User> {
        const user = await UserModel.findOne({email: email});
        if (!user) {
            return null;
        }
        const userProperties: UserProperties = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            password: user.password,
            created: user.created,
            updated: user.updated,
            library: user.library,
        }
        const userFound = await new User(userProperties);
        return Promise.resolve(userFound);
    };

    async getById(id: string): Promise<User> {
        const user = await UserModel.findOne({id: id});
        if (!user) {
            return null;
        }
        const userProperties: UserProperties = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            password: user.password,
            created: user.created,
            updated: user.updated,
            library: user.library,
        }
        const userFound = await new User(userProperties);
        return Promise.resolve(userFound);
    };

    delete(userId: string): string {
        UserModel.deleteOne({id: userId});
        return userId;
    };

    addAlbum(input: AddAlbumInput): Promise<User>;

    removeAlbum(input: RemoveAlbumInput): Promise<User>;

    addTrack(input: AddTrackInput): Promise<User>;

    removeTrack(input: RemoveTrackInput): Promise<User>;
}