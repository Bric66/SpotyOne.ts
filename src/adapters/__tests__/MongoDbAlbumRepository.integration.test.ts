import {v4} from "uuid";
import mongoose from "mongoose";
import {Album} from "../../core/Entities/Album";
import {MongoDbAlbumRepository} from "../repositories/mongoDb/MongoDbAlbumRepository";
import {AlbumModel} from "../repositories/mongoDb/models/album";

describe('Integration - MongoDbAlbumRepository', () => {

    let album: Album;
    let album2: Album;
    let album3: Album;
    let result: Album
    const mongoDbAlbumRepository = new MongoDbAlbumRepository();

    beforeAll(() => {
        const databaseId = v4()
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
            if (err) {
                throw err;
            }
            console.info("Connected to mongodb");
        });

        album = Album.create({
            albumId: "1234",
            userId: "1463165",
            albumTitle: "Album Title",
            artist: "Artist",
            file: "hhtp://../album",
            tracks: [
                {
                    trackId: "132354",
                    trackTitle: "title",
                },
                {
                    trackId: "789798",
                    trackTitle: "title",
                },
                {
                    trackId: "4654654687",
                    trackTitle: "title",
                },
            ],
        });
        album2 = Album.create({
            albumId: "5678",
            userId: "1463165",
            albumTitle: "WMCA",
            artist: "village people",
            file: "hhtp://../album",
            tracks: [
                {
                    trackId: "132354",
                    trackTitle: "title",
                },
                {
                    trackId: "789798",
                    trackTitle: "title",
                },
                {
                    trackId: "4654654687",
                    trackTitle: "title",
                },
            ],
        });

        album3 = new Album({
            albumId: "123456789",
            userId: "userId",
            albumTitle: "Album Title 3",
            artist: "Album Artist 3",
            file: "hhtp://../album",
            tracks:
                [{
                    trackId: "132354",
                    trackTitle: "title"
                },
                    {
                        trackId: "789798",
                        trackTitle: "title"
                    },
                    {
                        trackId: "4654654687",
                        trackTitle: "title"
                    }
                ],
            created: new Date(10),
            updated: null,
        })
    });

    beforeEach(async () => {
        result = await mongoDbAlbumRepository.create(album);
    })

    afterEach(async () => {
        await AlbumModel.collection.drop();
    });

    afterAll(async () => {

        await mongoose.connection.dropDatabase()
        await mongoose.connection.close();
    })

    it('should return true if album presentation exists', async () => {
        const test = await mongoDbAlbumRepository.exist(
            "Album Title",
            "Artist",
        );
        await expect(test).toBeTruthy();
    })

    it('should return false if album presentation doesnt exist', async () => {
        const result = await mongoDbAlbumRepository.exist(
            "WMCA",
            "village people"
        );
        await expect(result).toBeFalsy();
    })

    it("Should save an album", async () => {
        await expect(result.props.albumTitle).toEqual("Album Title");
        await expect(result.props.albumId).toBeTruthy();
    });

    it("Should update an album", async () => {
        album.update({
            albumTitle: "new album title",
            artist: "new artist",
            file: "new file",
            tracks:
                {
                    trackId: "132354",
                    trackTitle: "title",
                },
        })
        const result = await mongoDbAlbumRepository.updateAlbum(album)
        await expect(result.props.albumTitle).toEqual("new album title");
    })

    it("Should get album by id", async () => {
        const result = await mongoDbAlbumRepository.getAlbumById(album.props.albumId);
        await expect(result.props.albumTitle).toEqual(album.props.albumTitle);
    })

    it("Should throw if album not found by id", async () => {
        const result = () => mongoDbAlbumRepository.getAlbumById("wrong id");
        await expect(async () => result()).rejects.toThrow();
    })

    it("Should get album by userId", async () => {
        const result = await mongoDbAlbumRepository.getAlbumByUserId(album.props.userId);
        await expect(result.props.albumTitle).toEqual(album.props.albumTitle);
    })

    it("Should throw if album not found by userId", async () => {
        const result = () => mongoDbAlbumRepository.getAlbumByUserId("wrong id");
        await expect(async () => result()).rejects.toThrow();
    })

    it("Should get album by title", async () => {
        const result = await mongoDbAlbumRepository.getAlbumByTitle(album.props.albumTitle);
        await expect(result.props.albumTitle).toEqual(album.props.albumTitle);
    })

    it("Should throw if album not found by title", async () => {
        const result = () => mongoDbAlbumRepository.getAlbumByTitle("wrong title");
        await expect(async () => result()).rejects.toThrow();
    })

    it("Should get all albums", async () => {
        await mongoDbAlbumRepository.create(album2);
        const result = await mongoDbAlbumRepository.getAlbums();
        await expect(result).toHaveLength(2);
    })

    it("Should delete album ", async () => {
        const result = await mongoDbAlbumRepository.deleteAlbum(album.props.albumId);
        await expect(result).toBeFalsy();
    })

    it("Should get all albums by date", async () => {
        await mongoDbAlbumRepository.create(album2);
        await mongoDbAlbumRepository.create(album3);
        const result = await mongoDbAlbumRepository.getAlbumsByDate();
        expect(result[0]).toEqual({
            albumTitle: 'Album Title 3',
            artist: 'Album Artist 3',
            created: new Date(10)
        })


    })
})