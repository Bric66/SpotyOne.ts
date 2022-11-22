import { Album } from "../../core/Entities/Album";
import { AlbumRepository } from "../../core/repositories/AlbumRepository";
import { UpdateAlbumInput } from "../../core/Usecases/album/UpdateAlbum";
import { AlbumModel } from "./mongoDb/models/album";

export class MongoDbAlbumRepository implements AlbumRepository {
    async create(album: Album): Promise<Album> {
        const albumModel = new AlbumModel(album.props);
        await albumModel.save().then(() => console.log('Album created successfully'));
        return Promise.resolve(album);
    }
    
    getAlbums(): Promise<Album[]> {
        throw new Error("Method not implemented.");
    }
    getAlbumById(albumId: string): Promise<Album> {
        throw new Error("Method not implemented.");
    }
    updateAlbum(input: UpdateAlbumInput): Promise<Album> {
        throw new Error("Method not implemented.");
    }
    deleteAlbum(albumId: string): string {
        throw new Error("Method not implemented.");
    }
    getAlbumByUserId(userId: string): Promise<Album> {
        throw new Error("Method not implemented.");
    }

    async exist(albumTitle: string, artist: string): Promise<boolean> {
        const albumExist = await AlbumModel.findOne({albumTitle: albumTitle, artist: artist})
        if (albumExist) {
            return true
        }
        return false
    }
    
}