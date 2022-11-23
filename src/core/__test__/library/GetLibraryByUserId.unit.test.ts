import { GetLibraryByUserId } from './../../Usecases/library/GetLibraryByUserId';
import {Library} from "../../Entities/Library";
import {InMemoryLibraryRepository} from "../adapters/repositories/InMemoryLibraryRepository";


const db = new Map < string, Library>();


describe('When I call CreateLibrary', () => {
    let getLibraryByUserId: GetLibraryByUserId;
    let library: Library;

    beforeAll(() => {
        const inMemoryLibraryRepository = new InMemoryLibraryRepository(db);
        getLibraryByUserId = new GetLibraryByUserId(inMemoryLibraryRepository)
        library = new Library({
            albums: [],
            tracks: [],
            libraryId: "9999",
            title: "my library title",
            userId: "12345"
        }) 
        
        db.set(library.props.libraryId, library)
    });

    it('should get a library by user name', async () => {
        const result = await getLibraryByUserId.execute("12345")
        expect(result.props.title).toEqual("my library title")
    })
})
