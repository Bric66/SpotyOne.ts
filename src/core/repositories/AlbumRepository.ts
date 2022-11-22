import { UpdateAlbumInput } from "./../Usecases/album/UpdateAlbum";
import { Album } from "../Entities/Album";

export interface AlbumRepository {
  create(input: Album): Promise<Album>;

  getAlbums(): Promise<string[]>;

  getAlbumById(albumId: string): Promise<Album>;

  updateAlbum(input: Album): Promise<Album>;

  deleteAlbum(albumId: string): string;

  getAlbumByUserId(userId: string): Promise<Album>;

  exist(albumTitle: string, artist: string): Promise<boolean>
}
