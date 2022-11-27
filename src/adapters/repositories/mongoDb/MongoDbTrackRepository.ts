import {TrackRepository} from "../../../core/repositories/TrackRepository";
import {AlbumModel} from "./models/album";
import {Track, TrackProperties} from "../../../core/Entities/Track";
import {TrackModel} from "./models/track";

export class MongoDbTrackRepository implements TrackRepository {

    async create(track: Track): Promise<Track> {
        const trackModel = new TrackModel(track.props);
        await trackModel.save().then(() => console.log("Track created successfully"));
        return track;
    }

    async getByUserId(userId: string): Promise<Track> {
        const track = await TrackModel.findOne({userId: userId});
        if (!track) {
            throw new Error('Track not found');
        }
        const trackProperties: TrackProperties = {
            trackTitle: track.trackTitle,
            duration: track.duration,
            artist: track.artist,
            file: track.file,
            updated: track.updated,
            userId: track.userId,
            trackId: track.trackId,
            created: track.created,
        }
        const trackFound = new Track(trackProperties);
        return trackFound;
    }

    async getTracks(): Promise<Object[]> {
        const tracks = await TrackModel.find();
        const result = tracks.map(({ trackTitle, artist, userId }) => ({
            trackTitle,
            artist,
            userId,
        }));
        return result;
    }

    update(input: Track): Promise<Track> {
        AlbumModel.findOneAndUpdate(
            {id: input.props.userId},
            {
                $set: {

                    trackTitle: input.props.trackTitle,
                    duration: input.props.duration,
                    artist: input.props.artist,
                    file: input.props.file,
                    updated: input.props.updated

                }
            },
            {new: true}
        )
        console.log('Track updated successfully');
        return Promise.resolve(input);
    }

    async delete(trackId: string): Promise<void> {
        await TrackModel.deleteOne({trackId: trackId}).then(() => console.log('Track deleted successfully'));
        return;
    }

    async getById(trackId: string): Promise<Track> {
        const track = await TrackModel.findOne({trackId: trackId});
        if (!track) {
            throw new Error('Track not found');
        }
        const trackProperties: TrackProperties = {
            trackTitle: track.trackTitle,
            duration: track.duration,
            artist: track.artist,
            file: track.file,
            updated: track.updated,
            userId: track.userId,
            trackId: track.trackId,
            created: track.created,
        }
        const trackFound = new Track(trackProperties);
        return trackFound;
    }

    async getByTitle(trackTitle: string): Promise<Track> {
        const track = await TrackModel.findOne({trackTitle: trackTitle});
        if (!track) {
            throw new Error('Track not found');
        }
        const trackProperties: TrackProperties = {
            trackTitle: track.trackTitle,
            duration: track.duration,
            artist: track.artist,
            file: track.file,
            updated: track.updated,
            userId: track.userId,
            trackId: track.trackId,
            created: track.created,
        }
        const trackFound = new Track(trackProperties);
        return trackFound;

    }

    async exist(trackTitle: string, artist: string): Promise<Boolean> {
        const trackExist = await TrackModel.findOne({
            trackTitle: trackTitle,
            artist: artist,
        });
        if (trackExist) {
            return true;
        }
        return false;
    }
}
