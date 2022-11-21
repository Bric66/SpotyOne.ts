import {UserRepository} from "../../../core/repositories/UserRepository";
import {User, UserProperties} from "../../../core/Entities/User";
import {UserModel} from "./models/user";
import {UserUpdatedInput} from "../../../core/Usecases/user/UpdateUser";

export class MongoDbUserRepository implements UserRepository {

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

    async update(input: UserUpdatedInput): Promise<User> {
        await UserModel.updateOne(
            {userId: input.userId},
            {
                userName: input.userName,
                email: input.email,
                password: input.password,
                updated: input.updated,
                userId: input.userId
            },
            {upsert: true,}
        ).then(() => console.log('User updated successfully'));
        const result = await this.getById(input.userId);
        return Promise.resolve(result);
    };

    delete(userId: string): string {
        UserModel.deleteOne({id: userId}).then(() => console.log('User deleted successfully'));
        return userId;
    };
}