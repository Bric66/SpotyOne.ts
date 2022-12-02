import {DomainError} from "./DomainError";

export namespace LibraryErrors {

    export class LibraryNotFound extends DomainError {
        constructor() {
            super("LIBRARY_NOT_FOUND");
        }
    }

    export class AlbumAlreadyAdded extends DomainError {
        constructor() {
            super("ALBUM_ALREADY_ADDED");
        }
    }

    export class TrackAlreadyAdded extends DomainError {
        constructor() {
            super("TRACK_ALREADY_ADDED");
        }
    }
}