import { TrackRepository } from '../../repositories/TrackRepository';
import { UseCase } from "../Usecase";
import { Library } from "../../Entities/Library";
import { LibraryRepository } from "../../repositories/LibraryRepository";

export type AddTrackToLibraryInput = {
  userId: string;
  trackTitle: string;
};

export class AddTrackToLibrary implements UseCase<AddTrackToLibraryInput, Promise<Library>> {
  constructor(
    private readonly libraryRepository: LibraryRepository,
    private readonly trackRepository: TrackRepository
    ) {}
  
  async execute(input: AddTrackToLibraryInput): Promise<Library> {
    const track = await this.trackRepository.getByTitle(input.trackTitle)
    const library = await this.libraryRepository.getByUserId(input.userId)
    const isTrackAlreadyAdded = await this.libraryRepository.findLibraryByTrackId(track.props.trackId)
    if (isTrackAlreadyAdded) {
      throw new Error("track already added")
    }
    
    library.addTrack({
      trackId: track.props.trackId,
      title: track.props.trackTitle
    })
    
    await this.libraryRepository.update(library)
    return library
  }
}