import { model, Schema } from "mongoose";

export type trackModel = {
    trackId: string;
    trackTitle: string;
    artist: string;
    duration: number;
    file: string;
    created: number;
    updated?: number;
    userId: string;
}

const trackSchema = new Schema({
  trackId: {
    type: String,
    required: true,
  },
  trackTitle: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  file: {
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
  userId: {
    type: String,
    required: true,
  },
});

export const TrackModel = model("Track", trackSchema);
