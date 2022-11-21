export type UserProperties = {
    id: string;
    userName: string;
    email: string;
    password: string;
    created: Date;
    updated: Date;
    library: any[];
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
    }) {
        return new User({
            id: props.id,
            userName: props.userName.trim(),
            email: props.email.toLowerCase().trim(),
            password: props.password,
            created: new Date(),
            updated: null,
            library: [],
        })
    }


    update (props:{
        userName: string;
        email: string;
        password: string;
        updated: Date;
    }   )
    {
        this.props.userName=props.userName;
        this.props.email=props.email;
        this.props.password=props.password;
        this.props.updated=props.updated;
    }
}

