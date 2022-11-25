import {Library} from "../../Entities/Library";
import {InMemoryLibraryRepository} from "../adapters/repositories/InMemoryLibraryRepository";
import {InMemoryAlbumRespository} from "../adapters/repositories/InMemoryAlbumRespository";
import {Album} from "../../Entities/Album";
import {AddAlbumToLibrary} from "../../Usecases/library/AddAlbumToLibrary";

const dbLibrary = new Map<string, Library>();
const dbAlbum = new Map<string, Album>();

describe('When I call AddAlbumToLibrary', () => {
    let addAlbumToLibrary: AddAlbumToLibrary;
    let library: Library;
    let album: Album;


    beforeAll(() => {
        const inMemoryLibraryRepository = new InMemoryLibraryRepository(dbLibrary);
        const inMemoryAlbumRepository = new InMemoryAlbumRespository(dbAlbum);
        addAlbumToLibrary = new AddAlbumToLibrary(inMemoryLibraryRepository, inMemoryAlbumRepository)

        album = new Album({
            albumId: "111",
            albumTitle: "wmca",
            artist: "village people",
            tracks: [],
            userId: "12345",
            file: "",
            created: new Date(),
            updated: null,
        });
        dbAlbum.set(album.props.albumId, album);

    })

    it('should add album to library', async () => {
        library = new Library({
            albums: [],
            tracks: [],
            libraryId: "9999",
            title: "my library title",
            userId: "12345"
        })
        dbLibrary.set(library.props.libraryId, library);

        const result = await addAlbumToLibrary.execute({
            userId: library.props.userId,
            title: album.props.albumTitle
        })
        expect(result.props.albums).toBeTruthy();
        dbLibrary.delete(library.props.libraryId);
    })
    it('should throw if album already added', async () => {
        library = new Library({
            albums: [{
                albumId: "111",
                title: "wmca"
            }],
            tracks: [],
            libraryId: "9999",
            title: "my library title",
            userId: "12345"
        })
        dbLibrary.set(library.props.libraryId, library);

        const result = () => addAlbumToLibrary.execute({
            userId: library.props.userId,
            title: album.props.albumTitle
        })
        await expect(() => result()).rejects.toThrow();
    })


})