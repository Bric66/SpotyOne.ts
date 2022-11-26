import {UserRepository} from "../../../core/repositories/UserRepository";
import {User, UserProperties} from "../../../core/Entities/User";
import {UserModel} from "./models/user";

export class MongoDbUserRepository implements UserRepository {

    async create(user: User): Promise<User> {
        const userModel = new UserModel(user.props);
        await userModel.save().then(() => console.log('User created successfully'));
        return user;
    }

    async getByEmail(email: string): Promise<User> {
        const user = await UserModel.findOne({email: email});
        if (!user) {
            return null
        }
        const userProperties: UserProperties = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            password: user.password,
            created: user.created,
            updated: user.updated,
            libraryId: user.libraryId,
        }
        const userFound = new User(userProperties);
        return userFound;
    };

    async getById(id: string): Promise<User> {
        const user = await UserModel.findOne({id: id});
        if (!user) {
            throw new Error("user not found");
        }
        const userProperties: UserProperties = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            password: user.password,
            created: user.created,
            updated: user.updated,
            libraryId: user.libraryId,
        }
        const userFound = new User(userProperties);
        return userFound;
    };

    async update(input: User): Promise<User> {
        await UserModel.findOneAndUpdate(
            {id: input.props.id},
            {
                $set: {
                    userName: input.props.userName,
                    email: input.props.email,
                    password: input.props.password,
                    updated: input.props.updated,
                }
            },
            {new: true}
        )
        console.log('User updated successfully');
        return input;
    };

    async delete(userId: string): Promise<void> {
        await UserModel.deleteOne({id: userId}).then(() => console.log('User deleted successfully'));
        return;
    };
}