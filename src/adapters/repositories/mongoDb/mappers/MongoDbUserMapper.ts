import {userModel} from "./../models/user";
import {User} from "./../../../../core/Entities/User";
import {Mapper} from "../../../../core/models/Mapper";

export class MongoDbUserMapper implements Mapper<userModel, User> {

    fromDomain(data: User): userModel {
        const {
            id,
            created,
            email,
            libraryId,
            password,
            updated,
            userName
        } = data.props;
        let u: userModel = {
            id,
            created: +created,
            email,
            libraryId,
            password,
            updated: +updated,
            userName
        }
        return u
    }

    toDomain(raw: userModel): User {
        const {
            id,
            created,
            email,
            libraryId,
            password,
            updated,
            userName
        } = raw;
        return new User({
            id,
            created: new Date(created),
            email,
            password,
            libraryId,
            updated: new Date(updated),
            userName
        });
    }
}