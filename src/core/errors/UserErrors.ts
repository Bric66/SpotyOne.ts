import {DomainError} from "./DomainError";

export namespace UserErrors {
    export class UserAlreadyExists extends DomainError {
        constructor() {
            super("USER_ALREADY_EXISTS");
        }
    }
        export class UserNotFound extends DomainError {
        constructor() {
            super("USER_NOT_FOUND");
        }
    }

    export class WrongPassword extends DomainError {
        constructor() {
            super("WRONG_PASSWORD");
        }
    }
}