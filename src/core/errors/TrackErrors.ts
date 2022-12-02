import {DomainError} from "./DomainError";

export namespace TrackErrors {
    export class TrackAlreadyExists extends DomainError {
        constructor() {
            super("TRACK_ALREADY_EXISTS");
        }
    }

    export class TrackNotFound extends DomainError {
        constructor() {
            super("TRACK_NOT_FOUND");
        }
    }
}