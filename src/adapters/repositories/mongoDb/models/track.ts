import {model, Schema} from "mongoose";

const trackSchema = new Schema({
    trackId: {type: String,},
    trackTitle: {type: String,},
    artist: {type: String,},
    duration: {type: Number,},
    file: {type: String,},
    created: {type: Date,},
    updated: {type: Date,},
    userId: {type: String,},
})

export const TrackModel=model ('Track',trackSchema)