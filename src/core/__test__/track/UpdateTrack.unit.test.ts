import { InMemoryTrackRepository } from "./../adapters/repositories/InMemoryTrackRepository";
import { Track } from "../../Entities/Track";
import { UpdateTrack } from "../../Usecases/track/UpdateTrack";

const db = new Map<string, Track>();

describe("unit - CreateTrack", () => {
  let updateTrack: UpdateTrack;
  let track: Track;

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
    const inMemoryTrackRepository = new InMemoryTrackRepository(db);
    updateTrack = new UpdateTrack(inMemoryTrackRepository);
    db.set(track.props.trackId, track);
  });
  it("should update a track", async () => {
    const result = await updateTrack.execute({
      trackTitle: "new title track",
      duration: 1500,
      artist: "new artist name",
      file: "http://newlink",
      userId: track.props.userId,
    });
    expect(result.props.trackTitle).toEqual("new title track");
    expect(result.props.updated).toBeTruthy();
  });
});
