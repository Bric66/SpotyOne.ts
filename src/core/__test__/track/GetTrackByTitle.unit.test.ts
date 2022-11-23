import { GetTrackByTitle } from './../../Usecases/track/GetTrackByTitle';
import { InMemoryTrackRepository } from './../adapters/repositories/InMemoryTrackRepository';
import { Track } from "./../../Entities/Track";
import { TrackRepository } from "./../../repositories/TrackRepository";

const db = new Map<string, Track>();

describe("Unit - GetTrackByTitle", () => {
  let track: Track;
  let trackRepository: TrackRepository;
  const inMemoryTrackRepository = new InMemoryTrackRepository(db);
  const getTrackByTitle = new GetTrackByTitle(inMemoryTrackRepository)
  
  beforeAll(() => {
    track = new Track({
      userId: "12345",
      trackId: "9999",
      artist: "artist name",
      created: new Date(),
      updated: null,
      duration: 1000,
      file: "http://track.example",
      trackTitle: "title track",
    });
    db.set(track.props.trackId, track)
  });

  it("should get a track by title", async () => {

    const result = await getTrackByTitle.execute("title track")
    expect(result.props.trackTitle).toEqual("title track")
  });

});
