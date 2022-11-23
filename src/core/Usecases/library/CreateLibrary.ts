import { LibraryRepository } from './../../repositories/LibraryRepository';
import { AlbumProperties, TrackProperties } from './../../Entities/Album';
import { Library } from '../../Entities/Library';
import { UseCase } from './../Usecase';

export type CreateLibraryInput = {
    userId: string;
    title: string;
    userLibraryId: string;
}

export class CreateLibrary implements UseCase<CreateLibraryInput, Library> {
    constructor(
        private readonly libraryRepository: LibraryRepository,
        ) {}

      execute(input: CreateLibraryInput): Promise<Library> { 
         const library = Library.create({
             userId: input.userId,
             title: input.title,
             libraryId: input.userLibraryId,
         })
        this.libraryRepository.create(library)
        return Promise.resolve(library)
    }
}

