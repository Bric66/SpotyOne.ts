import {model, Schema} from "mongoose";
import {TrackProperties} from "../../../../core/Entities/Track";

const albumSchema = new Schema({
    albumId: {type: String,},
    albumTitle: {type: String,},
    file: {type: String,},
    tracksCount: {type: Number,},
    TotalDuration: {type: Number,},
    tracks: {type: Array<TrackProperties>},
    userId: {type: String,},
})

export const AlbumModel = model ('Album', albumSchema)