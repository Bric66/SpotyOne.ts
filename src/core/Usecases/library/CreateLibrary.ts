import { LibraryRepository } from './../../repositories/LibraryRepository';
import { AlbumProperties, TrackProperties } from './../../Entities/Album';
import { Library } from '../../Entities/Library';
import { UseCase } from './../Usecase';
import { IdGateway } from '../../gateways/IdGateway';

export type CreateLibraryInput = {
    userId: string;
    albums?: AlbumProperties;
    tracks?: TrackProperties;
    title: string;
}

export class CreateLibrary implements UseCase<CreateLibraryInput, Library> {
    constructor(
        private readonly libraryRepository: LibraryRepository,
        private readonly idGateway: IdGateway,
        ) {}

      execute(input: CreateLibraryInput): Promise<Library> {
        const id = this.idGateway.generate();
         const library = Library.create({
             userId: input.userId,
             title: input.title,
             libraryId: id,
         })
        this.libraryRepository.create(library)
        return Promise.resolve(library)
    }
}