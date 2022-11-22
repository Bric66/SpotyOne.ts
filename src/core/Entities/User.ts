import { AlbumProperties } from "./Album";
import { TrackLibraryProperties } from "./Library";

export type UserProperties = {
    id: string;
    userName: string;
    email: string;
    password: string;
    created: Date;
    updated: Date;
    libraryId: string;
}

export class User {
    props: UserProperties;

    constructor(props: UserProperties) {
        this.props = props;
    }

    static create(props: {
        id: string;
        userName: string;
        email: string;
        password: string;
        libraryId: string;
    }) {
        return new User({
            id: props.id,
            userName: props.userName.toLowerCase().trim(),
            email: props.email.toLowerCase().trim(),
            password: props.password,
            created: new Date(),
            updated: null,
            libraryId: props.libraryId,
        })
    }

    update (props:{
        userName: string;
        email: string;
        password: string;
    }   )
    {
        this.props.userName=props.userName.toLowerCase().trim();
        this.props.email=props.email.toLowerCase().trim();
        this.props.password=props.password;
        this.props.updated= new Date();
    }
}

