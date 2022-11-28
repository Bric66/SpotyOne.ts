export type TrackProperties = {
  trackId: string;
  trackTitle: string;
};

export type AlbumProperties = {
  albumId: string;
  albumTitle: string;
  artist: string;
  file: string;
  tracks: Array<TrackProperties>;
  created: Date;
  updated: Date;
  userId: string;
};
export class Album {
  props: AlbumProperties;
  constructor(props: AlbumProperties) {
    this.props = props;
  }
  
  static create(props: {
    albumId: string;
    albumTitle: string;
    artist: string;
    file: string;
    tracks: Array<TrackProperties>;
    userId: string;
  }) {
    return new Album({
      albumId: props.albumId,
      userId: props.userId,
      artist: props.artist,
      albumTitle: props.albumTitle,
      file: props.file,
      tracks: props.tracks,
      created: new Date(),
      updated: null,
    });
  }

  update(props: {
    file: string;
    tracks: TrackProperties;
    albumTitle: string;
    artist: string;
  }) {
    this.props.file = props.file;
    this.props.tracks.push(props.tracks);
    this.props.albumTitle = props.albumTitle;
    this.props.artist = props.artist;
    this.props.updated = new Date();
  }
}
