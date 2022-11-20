import { AlbumProperties, TrackProperties } from "./Album";

export type LibraryProperties = {
  ownerId: string;
  albums: Array<AlbumProperties>;
  tracks: Array<TrackProperties>;
};

export class Library {
  static create(arg0: { ownerId: string; album: AlbumProperties; track: TrackProperties; }) {
      throw new Error('Method not implemented.');
  }
  props: LibraryProperties;
  constructor(props: LibraryProperties) {
    this.props = props;
  }
}
