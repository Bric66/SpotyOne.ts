import { Track } from "../../Entities/Track";
import { TrackRepository } from "../../repositories/TrackRepository";
import { UseCase } from "../Usecase";

export type TrackUpdatedInput = {
  trackTitle: string;
  duration: number;
  artist: string;
  file: string;
  userId: string;
};

export class UpdateTrack implements UseCase<TrackUpdatedInput, Track> {
  constructor(private readonly trackRepository: TrackRepository) {}

  async execute(input: TrackUpdatedInput): Promise<Track> {
    const track = await this.trackRepository.getByUserId(input.userId);
    track.update({
      trackTitle: input.trackTitle,
      duration: input.duration,
      artist: input.artist,
      file: input.file,
    });
    return track;
  }
}
