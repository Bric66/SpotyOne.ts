export type AlbumLibraryProperties = {
  albumId: string;
  title: string;
  picture: string;
}

export type TrackLibraryProperties = {
  trackId: string;
  title: string;
}

export type LibraryProperties = {
  userId: string;
  libraryId: string;
  title: string;
  albums: Array<AlbumLibraryProperties>;
  tracks: Array<TrackLibraryProperties>;
};


export class Library {
  props: LibraryProperties;
  constructor(props: LibraryProperties) {
    this.props = props;
  }  
  
  static create(props: { 
    userId: string; 
    libraryId: string;
    title: string; }) {
      return new Library({
        userId: props.userId,
        libraryId: props.libraryId,
        title: props.title,
        albums: [],
        tracks: [],
      })
    }

    update(props : {
      title: string;
      albums: Array<AlbumLibraryProperties>; 
      tracks: Array<TrackLibraryProperties>; 
    }) {
      this.props.title = props.title;
      this.props.albums = props.albums;
      this.props.tracks = props.tracks;
    }

    addAlbum(album: AlbumLibraryProperties) {
      this.props.albums.push(album)
    }

    addTrack(track: TrackLibraryProperties) {
      this.props.tracks.push(track)
    }
}
