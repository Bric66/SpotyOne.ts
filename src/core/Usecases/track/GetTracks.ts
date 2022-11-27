import {UseCase} from "../Usecase";
import {TrackRepository} from "../../repositories/TrackRepository";

export class GetTracks implements UseCase<void, Promise<Object[]>> {
    constructor(private readonly trackRepository: TrackRepository) {
    }

    async execute(): Promise<Object[]> {
        const trackArray = await this.trackRepository.getTracks();
        return trackArray;
    }
}