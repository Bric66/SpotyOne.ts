import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {IdGateway} from "../../gateways/IdGateway";
import {PasswordGateway} from "../../gateways/PasswordGateway";
import {UserErrors} from "../../errors/UserErrors";

export type UserInput = {
    userName: string;
    email: string;
    password: string;
}

export class CreateUser implements UseCase<UserInput, User> {

    constructor(private readonly userRepository: UserRepository,
                private readonly idGateway: IdGateway,
                private readonly passwordGateway: PasswordGateway) {
    }

    async execute(input: UserInput): Promise<User> {
        const userExists = await this.userRepository.getByEmail(input.email.toLowerCase().trim());
        if (userExists) {
            throw new UserErrors.UserAlreadyExists ()
        }

        const id = this.idGateway.generate();
        const libraryId = this.idGateway.generate();
        const hash = this.passwordGateway.encrypt(input.password)
        const user = User.create({
            id: id,
            userName: input.userName,
            email: input.email,
            password: hash,
            libraryId: libraryId
        })

        const result = await this.userRepository.create(user);
        return Promise.resolve(result);
    }
}