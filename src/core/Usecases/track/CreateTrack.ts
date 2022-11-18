import {TrackRepository} from "../../repositories/TrackRepository";
import {IdGateway} from "../../gateways/IdGateway";
import {Track} from "../../Entities/Track";
import {UseCase} from "../Usecase";

export type TrackInput = {
    trackId: string;
    trackTitle: string;
    duration: number;
    file: string
    userId: string
}

export class CreateTrack implements UseCase<TrackInput, Track> {

    constructor(private readonly trackRepository: TrackRepository,
                private readonly idGateway: IdGateway) {
    }

    async execute(input: TrackInput): Promise<Track> {
        const trackExists = await this.trackRepository.getByUserId(input.userId.toLowerCase().trim());
        if (trackExists) {
            throw new Error('user already exists')
        }
        const id = this.idGateway.generate();

        const track = Track.create({
            trackId: id,
            trackTitle: input.trackTitle,
            duration: input.duration,
            file: input.file,
            userId: input.userId
        })

        const result = await this.trackRepository.create(track);
        return Promise.resolve(result);
    }
}