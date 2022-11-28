import { Album } from "../Entities/Album";

export interface AlbumRepository {
  create(input: Album): Promise<Album>;

  getAlbums(): Promise<Object[]>;

  getAlbumsByDate(): Promise<Object[]>;

  getAlbumById(albumId: string): Promise<Album>;

  getAlbumByTitle(albumTitle: string) : Promise<Album>;

  updateAlbum(input: Album): Promise<Album>;

  deleteAlbum(albumId: string): void;

  getAlbumByUserId(userId: string): Promise<Album>;

  exist(albumTitle: string, artist: string): Promise<boolean>

}
