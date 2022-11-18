import {Track} from "../../Entities/Track";
import {TrackRepository} from "../../repositories/TrackRepository";
import {UseCase} from "../Usecase";

export type TrackUpdatedInput = {
    trackTitle: string;
    duration: number;
    file: string;
    updated:Date;
    userId: string
}

export class UpdateTrack implements UseCase<TrackUpdatedInput, Track> {

    constructor(private readonly userRepository: TrackRepository,
    ) {
    }

    async execute(input: TrackUpdatedInput): Promise<Track> {

        const track = await this.userRepository.update({
            trackTitle: input.trackTitle,
            duration: input.duration,
            file: input.file,
            updated: new Date(),
            userId: input.userId
        });

        return Promise.resolve(track);
    }
}