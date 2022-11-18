import {UseCase} from "../Usecase";
import {Track} from "../../Entities/Track";
import {TrackRepository} from "../../repositories/TrackRepository";

export type TrackDeletedInput = {
    userId: string
}

export class DeleteUser implements UseCase<TrackDeletedInput, Track> {

    constructor(private readonly userRepository: TrackRepository){
    }

    async execute(input: TrackDeletedInput): Promise<Track> {

        const track = await this.userRepository.delete({
            userId: input.userId
        });

        return Promise.resolve(track);
    }
}