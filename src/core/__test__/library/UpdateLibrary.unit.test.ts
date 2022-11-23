import { UpdateLibrary } from './../../Usecases/library/UpdateLibrary';
import {Library} from "../../Entities/Library";

import {InMemoryLibraryRepository} from "../adapters/repositories/InMemoryLibraryRepository";


const db = new Map < string, Library>();


describe('Unit - UpdateLibrary', () => {
    let updateLibrary: UpdateLibrary;
    let library: Library;

    beforeAll(() => {
        const inMemoryLibraryRepository = new InMemoryLibraryRepository(db);
        updateLibrary = new UpdateLibrary(inMemoryLibraryRepository)
        library = new Library({
            albums: [],
            tracks: [],
            libraryId: "9999",
            title: "my library title",
            userId: "12345"
        }) 
        
        db.set(library.props.libraryId, library)
    });

    it('should update library', async () => {
        const result = await updateLibrary.execute({
            userId: "12345",
            title: "my new library title"
        })
        expect(result.props.title).toEqual("my new library title")
    })
})