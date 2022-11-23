import { TrackRepository } from '../../repositories/TrackRepository';
import { UseCase } from "../Usecase";
import { Library } from "../../Entities/Library";
import { LibraryRepository } from "../../repositories/LibraryRepository";

export type AddTrackToLibraryInput = {
  userId: string;
  trackId: string;
};

export class AddTrackToLibrary implements UseCase<AddTrackToLibraryInput, Promise<Library>> {
  constructor(
    private readonly libraryRepository: LibraryRepository,
    private readonly trackRepository: TrackRepository
    ) {}

  async execute(input: AddTrackToLibraryInput): Promise<Library> {
    const track = await this.trackRepository.getById(input.trackId)
    const library = await this.libraryRepository.getByUserId(input.userId)
    library.addTrack({
      trackId: track.props.trackId,
      title: track.props.trackTitle
    })
    await this.libraryRepository.update(library)
    return library
  }
}