import {Track} from "../Entities/Track";
import {TrackUpdatedInput} from "../Usecases/track/UpdateTrack";

export interface TrackRepository {
    create(input: Track): Promise<Track>;

    getByUserId(userId: string): Promise<Track>;

    update(input: TrackUpdatedInput): Promise<Track>;

    delete(userId: string): string;

}