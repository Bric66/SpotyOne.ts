import { LibraryRepository } from '../../repositories/LibraryRepository';
import { UseCase } from './../Usecase';

export type LibraryDeletedInput = {
    userId: string
}


export class DeleteLibrary implements UseCase<LibraryDeletedInput, void> {
    constructor(
        private readonly libraryRepository: LibraryRepository
    ) {}
    
    async execute(input: LibraryDeletedInput): Promise<void> {
        await this.libraryRepository.delete(input.userId)
        return ;
    }
}