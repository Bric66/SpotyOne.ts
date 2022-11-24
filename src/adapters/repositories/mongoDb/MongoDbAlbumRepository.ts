import {Album} from "../../../core/Entities/Album";
import {AlbumRepository} from "../../../core/repositories/AlbumRepository";
import {AlbumModel} from "./models/album";

export class MongoDbAlbumRepository implements AlbumRepository {
    async create(album: Album): Promise<Album> {
        const albumModel = new AlbumModel(album.props);
        await albumModel.save().then(() => console.log('Album created successfully'));
        return Promise.resolve(album);
    }

    updateAlbum(input: Album): Promise<Album> {
        return Promise.resolve(undefined);
    }

    getAlbumById(albumId: string): Promise<Album> {
        throw new Error("Method not implemented.");
    }

    getAlbumByUserId(userId: string): Promise<Album> {
        throw new Error("Method not implemented.");
    }

    getAlbums(): Promise<string[]> {
        return Promise.resolve([]);
    }
    getAlbumByTitle(albumTitle: string): Promise<Album> {
        return Promise.resolve(undefined);
    }

    async exist(albumTitle: string, artist: string): Promise<boolean> {
        const albumExist = await AlbumModel.findOne({albumTitle: albumTitle, artist: artist})
        if (albumExist) {
            return true
        }
        return false
    }

    deleteAlbum(albumId: string): string {
        throw new Error("Method not implemented.");
    }
}