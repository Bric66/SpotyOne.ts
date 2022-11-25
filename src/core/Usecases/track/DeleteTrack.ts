import {UseCase} from "../Usecase";
import {Track} from "../../Entities/Track";
import {TrackRepository} from "../../repositories/TrackRepository";


export class DeleteTrack implements UseCase<string, void> {

    constructor(private readonly trackRepository: TrackRepository) {
    }

    execute(trackId: string): Promise<void> {

        const track = this.trackRepository.delete(trackId);

        return ;
    }
}