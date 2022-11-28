import { Track } from "./../../Entities/Track";
import { InMemoryTrackRepository } from "./../adapters/repositories/InMemoryTrackRepository";
import { GetTracksByDescendingDate } from "./../../Usecases/track/GetTracksByDescendingDate";
const db = new Map<string, Track>();
const trackRepository = new InMemoryTrackRepository(db);
const getTracksByDescendingDate = new GetTracksByDescendingDate(
  trackRepository
);

describe("Unit - getTracksByDescendingDate", () => {
  const track1 = new Track({
    artist: "Artist 1",
    duration: 1000,
    file: "http://track.example",
    trackId: "123456",
    trackTitle: "track title",
    userId: "99999",
    created: new Date(1000),
  });
  const track2 = new Track({
    artist: "Artist 2",
    duration: 1000,
    file: "http://track.example",
    trackId: "12345",
    trackTitle: "track title 2",
    userId: "99999",
    created: new Date(100),
  });
  db.set(track1.props.trackId, track1);
  db.set(track2.props.trackId, track2);

  it("should get tracks by descending date", async () => {
    const result = await getTracksByDescendingDate.execute();
    expect(result[0]).toEqual({
      artist: "Artist 2",
      created: new Date(100),
      title: "track title 2",
    });
  });
});
