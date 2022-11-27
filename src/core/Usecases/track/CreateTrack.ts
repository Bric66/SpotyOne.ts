import {TrackRepository} from "../../repositories/TrackRepository";
import {IdGateway} from "../../gateways/IdGateway";
import {Track} from "../../Entities/Track";
import {UseCase} from "../Usecase";

export type TrackInput = {
    trackTitle: string;
    artist: string;
    duration: number;
    file: string
    userId: string
}

export class CreateTrack implements UseCase<TrackInput, Track> {

    constructor(private readonly trackRepository: TrackRepository,
                private readonly idGateway: IdGateway) {
    }

    async execute(input: TrackInput): Promise<Track> {
        const istrackExists = await this.trackRepository.exist(input.trackTitle, input.artist)
        if (istrackExists) {
            throw new Error('track already exists')
        }
        const id = this.idGateway.generate();

        const track = Track.create({
            trackId: id,
            trackTitle: input.trackTitle,
            artist: input.artist,
            duration: input.duration,
            file: input.file,
            userId: input.userId
        })

        const result = await this.trackRepository.create(track);
        return Promise.resolve(result);
    }
}