import {Album} from "../../../core/Entities/Album";
import {AlbumRepository} from "../../../core/repositories/AlbumRepository";
import {AlbumModel} from "./models/album";
import {MongoDbAlbumMapper} from "./mappers/MongoDbAlbumMapper";
import {AlbumErrors} from "../../../core/errors/AlbumErrors";

const mongoDbAlbumMapper = new MongoDbAlbumMapper();

export class MongoDbAlbumRepository implements AlbumRepository {

    async create(album: Album): Promise<Album> {
        const toAlbumModel = mongoDbAlbumMapper.fromDomain(album)
        const albumModel = new AlbumModel(toAlbumModel);
        await albumModel.save()
        return album;
    }

    updateAlbum(input: Album): Promise<Album> {
        const toAlbumModel = mongoDbAlbumMapper.fromDomain(input)
        AlbumModel.findOneAndUpdate(
            {id: toAlbumModel.userId},
            {
                $set: {
                    albumTitle: toAlbumModel.albumTitle,
                    artist: toAlbumModel.artist,
                    updated: toAlbumModel.updated,
                    tracks: toAlbumModel.tracks,
                    file: toAlbumModel.file,
                },
            },
            {new: true}
        );
        return Promise.resolve(input);
    }

    async getAlbums(): Promise<Object[]> {
        const albums = await AlbumModel.find();
        const result = albums.map(({albumTitle, artist, userId}) => ({
            albumTitle, artist, userId
        }));
        return result;
    }

    async getAlbumsByDate(): Promise<Object[]> {
        const albums = await AlbumModel.find();
        albums.sort((a, b) => a.created - b.created);
        const result = await albums.map(({albumTitle, artist, created}) => ({
            albumTitle : albumTitle,
            artist : artist,
            created : new Date(created)
        }));
        return result
    }

    async getAlbumById(albumId: string): Promise<Album> {

        const album = await AlbumModel.findOne({albumId: albumId});
        if (!album) {
            throw new AlbumErrors.AlbumNotFound();
        }
        return mongoDbAlbumMapper.toDomain(album);
    }

    async getAlbumByUserId(userId: string): Promise<Album> {
        const album = await AlbumModel.findOne({userId: userId});
        if (!album) {
            throw new AlbumErrors.AlbumNotFound();
        }
        return mongoDbAlbumMapper.toDomain(album);
    }

    async getAlbumByTitle(albumTitle: string): Promise<Album> {
        const album = await AlbumModel.findOne({albumTitle: albumTitle});
        if (!album) {
            throw new AlbumErrors.AlbumNotFound();
        }
        return mongoDbAlbumMapper.toDomain(album);
    }


    async exist(albumTitle: string, artist: string): Promise<boolean> {
        const albumExist = await AlbumModel.findOne({
            albumTitle: albumTitle,
            artist: artist,
        });
        if (albumExist) {
            return true;
        }
        return false;
    }

    async deleteAlbum(albumId: string): Promise<void> {
        await AlbumModel.deleteOne({id: albumId});
        return;
    }
}
