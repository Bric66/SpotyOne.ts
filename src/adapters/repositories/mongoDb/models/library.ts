import { TrackLibraryProperties, AlbumLibraryProperties } from './../../../../core/Entities/Library';
import { model, Schema } from "mongoose";


const librarySchema = new Schema({
  userId: { type: String },
  albums: { type: Array<AlbumLibraryProperties> },
  title: { type: String },
  tracks: { type: Array<TrackLibraryProperties>},
  libraryId: { type: String },
});

export const LibraryModel = model("Library", librarySchema);
