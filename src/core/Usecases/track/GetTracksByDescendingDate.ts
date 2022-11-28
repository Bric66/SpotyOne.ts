import { TrackRepository } from './../../repositories/TrackRepository';
import { TrackProperties } from '../../Entities/Track';
import { UseCase } from './../Usecase';

export class GetTracksByDescendingDate implements UseCase<void, Promise<Object[]>> {
    constructor(
        private readonly trackRepository: TrackRepository,
    ) {}
    
    async execute(input: void): Promise<Object[]> {
        return await this.trackRepository.getTracksByDescendingDate()
    }

}