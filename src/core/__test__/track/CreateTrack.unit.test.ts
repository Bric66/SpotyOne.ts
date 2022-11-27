import { InMemoryTrackRepository } from "./../adapters/repositories/InMemoryTrackRepository";
import { CreateTrack } from "./../../Usecases/track/CreateTrack";
import { UuidGateway } from "../adapters/gateways/UuidGateway";
import { Track } from "../../Entities/Track";

const db = new Map<string, Track>();

describe("unit - CreateTrack", () => {
  let createTrack: CreateTrack;
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
    const uuidGateway = new UuidGateway();
    createTrack = new CreateTrack(inMemoryTrackRepository, uuidGateway);
  });
  it("should create a track", async () => {
    const result = await createTrack.execute({
      userId: "9999",
      artist: "new artist name",
      duration: 1000,
      file: "http://track.example",
      trackTitle: "new title",
    });
    expect(result.props.trackTitle).toEqual("new title");
  });
  it("should throw an error if the track exists", async () => {
    const result = () =>
      createTrack.execute({
        userId: "9999",
        artist: "new artist name",
        duration: 1000,
        file: "http://track.example",
        trackTitle: "new title",
      });
    expect(() => result()).rejects.toThrow();
  });
});
