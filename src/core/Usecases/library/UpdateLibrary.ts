import { AlbumLibraryProperties, Library, TrackLibraryProperties } from "../../Entities/Library";
import { LibraryRepository } from "../../repositories/LibraryRepository";
import { UseCase } from "../Usecase";

export type UpdateLibraryInput = {
    userId: string;
    title: string;
    albums: Array<AlbumLibraryProperties>; 
    tracks: Array<TrackLibraryProperties>; 
}

export class UpdateLibrary implements UseCase<UpdateLibraryInput, Promise<Library>> {
    constructor(
        private readonly libraryRepository: LibraryRepository
    ) {}
    
    async execute(input: UpdateLibraryInput): Promise<Library> {
        const library = await this.libraryRepository.getByUserId(input.userId)
        library.update({
            title: input.title,
            albums: input.albums,
            tracks:  input.tracks
        })
        return Promise.resolve(library)
    }   
}