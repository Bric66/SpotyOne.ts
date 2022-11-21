import { LibraryRepository } from '../../repositories/LibraryRepository';
import { UseCase } from './../Usecase';

export class DeleteLibrary implements UseCase<string, string> {
    constructor(
        private readonly libraryRepository: LibraryRepository
    ) {}
    
    execute(libraryId: string): string {
        this.libraryRepository.delete(libraryId)
        return libraryId;
    }
}