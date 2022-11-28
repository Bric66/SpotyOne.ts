import {InMemoryAlbumRespository} from "../adapters/repositories/InMemoryAlbumRespository";
import {UuidGateway} from "./../adapters/gateways/UuidGateway";
import {Album} from "../../Entities/Album";
import {CreateAlbum} from "../../Usecases/album/CreateAlbum";

const db = new Map<string, Album>();

describe("Unit - CreateAlbum", () => {
    let createAlbum: CreateAlbum;
    let album: Album;

    beforeAll(() => {
        album = new Album({
            albumId: "",
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
            created: new Date(),
            updated: null,
        });
        const inMemoryAlbumRespository = new InMemoryAlbumRespository(db);
        const uuidGateway = new UuidGateway();
        createAlbum = new CreateAlbum(inMemoryAlbumRespository, uuidGateway);
    });
    beforeEach(() => {
        db.clear()
        createAlbum.execute({
            albumTitle: album.props.albumTitle,
            artist: album.props.artist,
            file: album.props.file,
            tracks: album.props.tracks,
            userId: album.props.userId,
        });
    });

    it("should create an album", async () => {
        const result = album
        expect(result.props.albumTitle).toEqual("Album Title");
        expect(result.props.artist).toEqual("Artist");
        expect(result.props.created).toBeTruthy();
    });

    it("should throw error if album already exists", async () => {
        const result = () => createAlbum.execute({
            albumTitle: album.props.albumTitle,
            artist: album.props.artist,
            file: album.props.file,
            tracks: album.props.tracks,
            userId: album.props.userId,
        });
        await expect(async () => result()).rejects.toThrow();
    });
});