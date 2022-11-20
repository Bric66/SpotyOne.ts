import { LibraryRepository } from './../../repositories/LibraryRepository';
import { AlbumProperties, TrackProperties } from './../../Entities/Album';
import { Library } from '../../Entities/Library';
import { UseCase } from './../Usecase';

export type CreateLibraryInput = {
    ownerId: string;
    album?: AlbumProperties;
    track?: TrackProperties;
}

export class CreateLibrary implements UseCase<CreateLibraryInput, Library> {
    constructor(
        private readonly libraryRepository: LibraryRepository,
        ) {}

     execute(input: CreateLibraryInput): Promise<Library> {
         const library = Library.create({
            ownerId: input.ownerId,
            album: input.album,
            track: input.track
        })
        return Promise.resolve(library)
    }
}