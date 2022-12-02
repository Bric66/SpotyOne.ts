import {DomainError} from "./DomainError";

export namespace AlbumErrors {
    export class AlbumAlreadyExists extends DomainError {
        constructor() {
            super("ALBUM_ALREADY_EXISTS");
        }
    }

    export class AlbumNotFound extends DomainError {
        constructor() {
            super("ALBUM_NOT_FOUND");
        }
    }
}