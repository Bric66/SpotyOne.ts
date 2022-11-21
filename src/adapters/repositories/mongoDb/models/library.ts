import {model, Schema} from "mongoose";
import {AlbumProperties, TrackProperties} from "../../../../core/Entities/Album";

const librarySchema = new Schema({
    ownerId: {type: String,},
    albums: {type: Array<AlbumProperties>},
    tracks: {type: Array<TrackProperties>},
    password: {type: String,},
    created: {type: Date,},
    updated: {type: Date,},
    library: {type: [],},
})

export const UserModel=model ('Library',librarySchema)