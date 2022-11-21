import {model, Schema} from "mongoose";
import {TrackProperties} from "../../../../core/Entities/Track";

const albumSchema = new Schema({
    albumId: {type: String,},
    albumTitle: {type: String,},
    file: {type: String,},
    tracksCount: {type: Number,},
    TotalDuration: {type: Number,},
    tracks: {type: Array<TrackProperties>},
    ownerId: {type: String,},
})

export const UserModel=model ('Album',albumSchema)