import { AlbumLibraryProperties, TrackLibraryProperties } from './../../../../core/Entities/Library';
import { model, Schema } from "mongoose";

export type libraryModel = {
  userId: string;
  albums: Array<AlbumLibraryProperties>;
  title: string;
  tracks:Array<TrackLibraryProperties>;
  libraryId: string;
}

const librarySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  albums: [
    {
      albumId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  title: {
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
  libraryId: {
    type: String,
    required: true,
  },
});

export const LibraryModel = model("Library", librarySchema);
