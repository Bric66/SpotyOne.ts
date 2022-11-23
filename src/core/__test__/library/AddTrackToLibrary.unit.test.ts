import { InMemoryTrackRepository } from './../adapters/repositories/InMemoryTrackRepository';
import { AddTrackToLibrary } from '../../Usecases/library/AddTrackIdtoLibrary';
import {Library} from "../../Entities/Library";
import {InMemoryLibraryRepository} from "../adapters/repositories/InMemoryLibraryRepository";


const db = new Map < string, Library>();


describe('Unit - UpdateLibrary', () => {
    let addTrackToLibrary: AddTrackToLibrary;
    let library: Library;

    beforeAll(() => {
        const inMemoryTrackRepository = new InMemoryTrackRepositorytory()
        const inMemoryLibraryRepository = new InMemoryLibraryRepository(db);
        addTrackToLibrary = new AddTrackToLibrary(inMemoryLibraryRepository, InMemoryTrackRepository)
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