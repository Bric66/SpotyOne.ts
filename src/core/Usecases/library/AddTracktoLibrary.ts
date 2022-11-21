import { UseCase } from "../Usecase";
import { Library } from "../../Entities/Library";
import { LibraryRepository } from "../../repositories/LibraryRepository";

export type AddTrackToLibraryInput = {
  title: string;
  userId: string;
  trackId: string;
};

export class AddTracktoLibraryByTitle
  implements UseCase<AddTrackToLibraryInput, Promise<Library>>
{
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async execute(input: AddTrackToLibraryInput): Promise<Library> {
    const library = await this.libraryRepository.getByUserId(input.userId);

    library.addTrack({
      title: input.title,
      trackId: input.trackId,
    });

    library.update({
      title: library.props.title,
      albums: library.props.albums,
      tracks: library.props.tracks,
    });

    await this.libraryRepository.update({
      userId: library.props.userId,
      title: library.props.title,
      albums: library.props.albums,
      tracks: library.props.tracks,
    });
    return Promise.resolve(library);
  }
}
