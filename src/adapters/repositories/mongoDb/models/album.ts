import { model, Schema } from "mongoose";
import { TrackProperties } from "../../../../core/Entities/Track";

const albumSchema = new Schema({
  albumId: {
    type: String,
  },
  albumTitle: {
    type: String,
  },
  artist: {
    type: String,
  },
  file: {
    type: String,
  },
  tracks: {
    type: Array<TrackProperties>,
  },
  userId: {
    type: String,
  },
  created: {
    type: Date,
  },
  updated: {
    type: Date,
  },
});

export const AlbumModel = model("Album", albumSchema);
