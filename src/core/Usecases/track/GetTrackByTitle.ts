import { TrackRepository } from './../../repositories/TrackRepository';
import { Track } from './../../Entities/Track';
import { UseCase } from './../Usecase';

export class GetTrackByTitle implements UseCase<string, Promise<Track>> {
    constructor(private readonly trackRepository: TrackRepository) {}
    
    
    execute(trackName: string): Promise<Track>  {
        const track = this.trackRepository.getByTitle(trackName);
        return track
    }
    
}