export type TrackProperties = {
    trackId: string;
    trackTitle: string;
    duration: number;
    file: string;
    created: Date;
    updated: Date;
    userId: string;
}

export class Track {
    props: TrackProperties;

    constructor(props: TrackProperties) {
        this.props = props;
    }

    static create(props: {
        trackId: string;
        trackTitle: string;
        duration: number;
        file: string;
        userId: string;
    }) {
        return new Track({
            trackId: props.trackId,
            trackTitle: props.trackTitle,
            duration: props.duration,
            file: props.file,
            created: new Date(),
            updated: null,
            userId: props.userId,
        })
    }

    update(props: {
        trackTitle: string;
        duration: number;
        file: string;
        updated: Date;
    }) {
        this.props.trackTitle = props.trackTitle;
        this.props.duration = props.duration;
        this.props.file = props.file;
        this.props.updated = props.updated;
    }
}