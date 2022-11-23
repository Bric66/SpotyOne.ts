import {Library} from "../../../Entities/Library";
import {LibraryRepository} from "../../../repositories/LibraryRepository";
import {User} from "../../../Entities/User";

export class InMemoryLibraryRepository implements LibraryRepository {
    constructor(private readonly dbLibrary: Map<string, Library>) {
    }

    create(library: Library): Promise<Library> {
        this.dbLibrary.set(library.props.libraryId, library);
        return Promise.resolve(library)
    };

    getByUserId(userId: string): Promise<Library> {
        const library = this.dbLibrary.get(userId);
        return Promise.resolve(library)
    };

    update(library: Library): Promise<Library> {
        this.dbLibrary.set(library.props.libraryId, library);
        return Promise.resolve(library);
    };

    delete(libraryId: string): Promise<void> {
        return
    };
}