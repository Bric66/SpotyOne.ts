import { LibraryRepository } from '../../repositories/LibraryRepository';
import { Library } from './../../Entities/Library';
import { UseCase } from './../Usecase';

export type AddAlbumToLibraryInput = {
    albumId: string;
    title: string;
    picture: string;
    userId: string;
}


export class AddAlbumToLibraryByTitle implements UseCase<AddAlbumToLibraryInput, Promise<Library>> {
    
  constructor(private readonly libraryRepository: LibraryRepository) {}

    async execute(input: AddAlbumToLibraryInput): Promise<Library> {
        const library = await this.libraryRepository.getByUserId(input.userId);

        library.addAlbum({
            albumId: input.albumId,
            picture: input.picture,
            title: input.title,
        })

        library.update({
            albums: library.props.albums,
            title: library.props.title,
            tracks: library.props.tracks,
        })

        await this.libraryRepository.update({
            userId: library.props.userId,
            albums: library.props.albums,
            title: library.props.title,
            tracks: library.props.tracks
        })

        return Promise.resolve(library)
    }
}