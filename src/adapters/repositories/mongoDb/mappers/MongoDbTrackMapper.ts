import { Track } from "./../../../../core/Entities/Track";
import { trackModel } from "./../models/track";

export class MongoDbTrackMapper {
  toTrack(trackModelInput: trackModel): Track {
    return new Track({
      artist: trackModelInput.artist,
      created: new Date(trackModelInput.created),
      duration: trackModelInput.duration,
      file: trackModelInput.file,
      trackId: trackModelInput.trackId,
      trackTitle: trackModelInput.trackTitle,
      updated: new Date(trackModelInput.updated),
      userId: trackModelInput.userId,
    });
  }

  toTrackModel(track: Track): trackModel {
    return {
        artist: track.props.artist,
        created: +track.props.created,
        duration: track.props.duration,
        file: track.props.file,
        trackId: track.props.trackId,
        trackTitle: track.props.trackTitle,
        updated: +track.props.updated,
        userId: track.props.userId,
    }
  }
}
