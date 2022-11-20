import { UpdateAlbumInput } from './../Usecases/album/UpdateAlbum';
import { Album } from "../Entities/Album";

export interface AlbumRepository {
    create(input: Album): Promise<Album>;

    getAlbums(): Promise<Album[]>;

    getAlbumById(albumId: string): Promise<Album>;

    updateAlbum(input: UpdateAlbumInput): Promise<Album>;

    deleteAlbum(albumId: string): Promise<string>;

    getAlbumByOwnerId(ownerId: string): Promise<Album>
}