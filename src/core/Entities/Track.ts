export type TrackProperties = {
    trackId: string;
    trackTitle: string;
    artist: string;
    duration: number;
    file: string;
    created: Date;
    updated?: Date;
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
        artist: string;
        duration: number;
        file: string;
        userId: string;
    }) {
        return new Track({
            trackId: props.trackId,
            trackTitle: props.trackTitle,
            artist: props.artist,
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
        artist: string;
        file: string;
    }) {
        this.props.trackTitle = props.trackTitle;
        this.props.artist   = props.artist;
        this.props.duration = props.duration;
        this.props.file = props.file;
        this.props.updated = new Date()
        
    }
}