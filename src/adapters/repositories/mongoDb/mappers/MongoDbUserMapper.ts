import {userModel} from "./../models/user";
import {User} from "./../../../../core/Entities/User";

export class MongoDbUserMapper {
    toUser(userModel: userModel): User {
        return new User({
            id: userModel.id,
            created: new Date(userModel.created),
            email: userModel.email,
            password: userModel.password,
            libraryId: userModel.libraryId,
            updated: new Date(userModel.updated),
            userName: userModel.userName,
        });
    }

    toUserModel(user: User): userModel {
        return {
            id: user.props.id,
            created: +user.props.created,
            email: user.props.email,
            libraryId: user.props.libraryId,
            password: user.props.password,
            updated: +user.props.updated,
            userName: user.props.userName,
        };
    }
}