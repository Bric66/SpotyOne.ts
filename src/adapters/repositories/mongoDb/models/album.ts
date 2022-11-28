import { model, Schema } from "mongoose";

export type albumModel = {
  albumId: string;
  albumTitle: string;
  artist: string;
  file: string;
  tracks: Array<Object>
  userId: string;
  created?: Date;
  updated: Date;
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
      trackId: {
        type: String,
        required: true,       
      },
      trackTitle: {
        type: String,
        required: true,
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
    required: false,
  },
});

export const AlbumModel = model("Album", albumSchema);
