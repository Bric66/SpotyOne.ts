import {Library} from "../../../Entities/Library";
import {LibraryRepository} from "../../../repositories/LibraryRepository";

export class InMemoryLibraryRepository implements LibraryRepository {
    constructor(private readonly dbLibrary: Map<string, Library>) {
    }

    create(library: Library): Promise<Library> {
        this.dbLibrary.set(library.props.libraryId, library);
        return Promise.resolve(library)
    };

    async getByUserId(userId: string): Promise<Library> {
        const values = Array.from(this.dbLibrary.values());
        const library = values.find(library => library.props.userId === userId);
        if (!library) {
            throw new Error('library not found')
        }
        return library
    };

    update(library: Library): Promise<Library> {
        this.dbLibrary.set(library.props.libraryId, library);
        return Promise.resolve(library);
    };

    delete(libraryId: string): Promise<void> {
        return
    };

}