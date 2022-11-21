import { LibraryRepository } from './../../repositories/LibraryRepository';
import { Library } from "../../Entities/Library";
import { UseCase } from "../Usecase";

export class GetLibraryByUserId implements UseCase<string, Promise<Library>> {
    constructor(
        private readonly libraryRepository: LibraryRepository
    ) {}
    execute(userId: string): Promise<Library> {
        const library = this.libraryRepository.getByUserId(userId)
        return Promise.resolve(library)
    } 
}