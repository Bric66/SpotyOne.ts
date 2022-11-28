import "dotenv/config";
import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import express from "express";
import mongoose from "mongoose";
import supertest from "supertest";
import { Track } from "../../core/Entities/Track";
import { TrackRepository } from "../../core/repositories/TrackRepository";
import { trackRouter } from "../routes/track";
import { MongoDbTrackRepository } from "../../adapters/repositories/mongoDb/MongoDbTrackRepository";
import { TrackModel } from "../../adapters/repositories/mongoDb/models/track";
const app = express();

describe("E2E - Track router", () => {
  let accessKey;
  let track: Track;
  let track2: Track;
  let trackRepository: TrackRepository;

  beforeAll(() => {
    accessKey = sign(
      {
        id: "1234",
        userName: "jojolapin",
        email: "jojolapin@gmail.com",
        userLibraryId: "1234",
      },
      "maytheforcebewithyou"
    );

    app.use(express.json());
    app.use("/track", trackRouter);

    const databaseId = v4();
    mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
      if (err) {
        throw err;
      }
      console.info("Connected to mongodb");
    });
    track = Track.create({
      userId: "1234",
      trackTitle: "wmca",
      artist: "village people",
      file: "hhtp://../track",
      duration: 3000,
      trackId: "5678",
    });
    track2 = new Track({
      userId: "1234555",
      trackTitle: "track2",
      artist: "village people",
      file: "hhtp://../track",
      duration: 3000,
      trackId: "989898",
      created: new Date(10),
      updated: null,
    });
    trackRepository = new MongoDbTrackRepository();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    await TrackModel.collection.drop();
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should post/track/create", async () => {
    await supertest(app)
      .post("/track/create")
      .set("access_key", accessKey)
      .send({
        userId: "4567",
        trackTitle: "gogogo",
        artist: "george",
        file: "hhtp://../track22",
        duration: 4000,
        trackId: "1111",
      })
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toEqual("george");
        expect(responseBody.duration).toEqual(4000);
      })
      .expect(201);
  });

  it("should get/tracks", async () => {
    await trackRepository.create(track);
    await trackRepository.create(track);
    await supertest(app)
      .get(`/track/all`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody).toHaveLength(2);
      })
      .expect(200);
  });

  it("should get/tracks/date", async () => {
    await trackRepository.create(track);
    await trackRepository.create(track2);
    await supertest(app)
      .get('/track/date')
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody[0]).toEqual({
          title: "track2",
          artist: "village people",
          created: "1970-01-01T00:00:00.010Z",
        });
      })
      .expect(200);
  });

  it("should get /track/:title", async () => {
    const result = await trackRepository.create(track);
    await supertest(app)
      .get(`/track/title/${result.props.trackTitle}`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.trackTitle).toEqual("wmca");
      })
      .expect(200);
  });

  it("should patch/track", async () => {
    await trackRepository.create(track);
    await supertest(app)
      .patch("/track")
      .set("access_key", accessKey)
      .send({
        trackTitle: "new title",
        duration: 10,
        artist: "new artist",
        file: "hhtp://../track22",
        userId: "1234",
      })
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toEqual("new artist");
        expect(responseBody.duration).toEqual(10);
      })
      .expect(200);
  });

  it("should delete /track", async () => {
    await trackRepository.create(track);
    await supertest(app)
      .delete(`/track/${track.props.trackId}`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toBeFalsy;
        expect(responseBody.id).toBeFalsy;
      })
      .expect(200);
  });
});
