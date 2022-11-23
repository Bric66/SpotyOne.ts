import {Track} from "../Entities/Track";
import {TrackUpdatedInput} from "../Usecases/track/UpdateTrack";

export interface TrackRepository {
    create(input: Track): Promise<Track>;

    getByUserId(userId: string): Promise<Track>;

    update(input: TrackUpdatedInput): Promise<Track>;

    delete(userId: string): string;

    getById(trackId: string): Promise<Track>;

    getByTitle(title: string): Promise<Track>;

    exist(trakcTitle: string, artist: string): Promise<Boolean> 

}