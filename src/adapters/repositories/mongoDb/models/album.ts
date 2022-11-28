import {model, Schema} from "mongoose";
import {TrackProperties} from "../../../../core/Entities/Album";

export type albumModel = {
    albumId: string,
    albumTitle: string,
    artist: string,
    file: string,
    tracks: Array<TrackProperties>,
    userId: string,
    created: number,
    updated?: number,
}

const albumSchema = new Schema({
    albumId: {
        type: String,
        required: true,
    },
    albumTitle: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    tracks: [
        {
            _id: {String,
            required : false,},
            trackId: {
                type: String,
                required: true,
            },
            trackTitle: {
                type: String,
                required: true,
            }
        }
    ],
    userId: {
        type: String,
        required: true,
    },
    created: {
        type: Number,
        required: true,
    },
    updated: {
        type: Number,
        required: false,
    },
});

export const AlbumModel = model("Album", albumSchema);
