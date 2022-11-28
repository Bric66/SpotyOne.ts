import { MongoDbTrackMapper } from './mappers/MongoDbTrackMapper';
import {TrackRepository} from "../../../core/repositories/TrackRepository";
import {AlbumModel} from "./models/album";
import {Track, TrackProperties} from "../../../core/Entities/Track";
import {TrackModel} from "./models/track";
const mongoDbTrackMapper = new MongoDbTrackMapper()

export class MongoDbTrackRepository implements TrackRepository {


    async create(track: Track): Promise<Track> {
        const toTrackModel = mongoDbTrackMapper.toTrackModel(track)
        const trackModel = new TrackModel(toTrackModel);
        await trackModel.save()
        return track;
    }

    async getByUserId(userId: string): Promise<Track> {
        const track = await TrackModel.findOne({userId: userId});
        if (!track) {
            throw new Error('Track not found');
        }

        return mongoDbTrackMapper.toTrack(track)
   
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

    async getTracksByDescendingDate(): Promise<Object[]> {
        const tracks = await TrackModel.find();
        tracks.sort((a, b) => +a.created - +b.created);
        return tracks.map((track) => ({
        title: track.trackTitle,
        artist: track.artist,
        created: new Date(track.created),
    }));
    
    }

    update(input: Track): Promise<Track> {
        const track = mongoDbTrackMapper.toTrackModel(input)
        AlbumModel.findOneAndUpdate(
            {id: track.userId},
            {
                $set: {

                    trackTitle: track.trackTitle,
                    duration: track.duration,
                    artist: track.artist,
                    file: track.file,
                    updated: track.updated

                }
            },
            {new: true}
        )
        return Promise.resolve(input);
    }

    async delete(trackId: string): Promise<void> {
        await TrackModel.deleteOne({trackId: trackId})
        return;
    }

    async getById(trackId: string): Promise<Track> {
        const track = await TrackModel.findOne({trackId: trackId});
        if (!track) {
            throw new Error('Track not found');
        }
        return mongoDbTrackMapper.toTrack(track)
    }

    async getByTitle(trackTitle: string): Promise<Track> {
        const track = await TrackModel.findOne({trackTitle: trackTitle});
        if (!track) {
            throw new Error('Track not found');
        }
        return mongoDbTrackMapper.toTrack(track)

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
