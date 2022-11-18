import {Track} from "../Entities/Track";
import {TrackUpdatedInput} from "../Usecases/track/UpdateTrack";
import {TrackDeletedInput} from "../Usecases/track/DeleteTrack";


export interface TrackRepository {
    create(input: Track): Promise<Track>;

    getByUserId(userId: string): Promise<Track>;

    update(input: TrackUpdatedInput): Promise<Track>;

    delete(input: TrackDeletedInput): Promise<Track>;

}