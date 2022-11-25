import { DeleteTrack } from "./../../Usecases/track/DeleteTrack";
import { InMemoryTrackRepository } from "./../adapters/repositories/InMemoryTrackRepository";
import { Track } from "../../Entities/Track";

const db = new Map<string, Track>();

describe("unit - CreateTrack", () => {
  let deleteTrack: DeleteTrack;
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
    deleteTrack = new DeleteTrack(inMemoryTrackRepository);
    db.set(track.props.trackId, track);
  });
  it("should delete a track", async () => {
    const result = await deleteTrack.execute("9999");
    expect(result).toBeFalsy();
  });
});
