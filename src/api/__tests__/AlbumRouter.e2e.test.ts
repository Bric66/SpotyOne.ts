import "dotenv/config";
import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import express, { response } from "express";
import mongoose from "mongoose";
import { albumRouter } from "../routes/album";
import supertest from "supertest";
const app = express();

describe("E2E - Album router", () => {
  let accessKey;

  beforeAll(() => {
    accessKey = sign(
      {
        id: "46546456",
        userName: "user.props.userName",
        email: "user.props.emai",
        userLibraryId: "user.props.libraryId",
      },
      "maytheforcebewithyou"
    );

    app.use(express.json());
    app.use("/album", albumRouter);

    const databaseId = v4();
    mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
      if (err) {
        throw err;
      }
      console.info("Connected to mongodb");
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should post /album", async () => {
    await supertest(app)
      .post("/album/create")
      .set("access_key", accessKey)
      .send({
        albumTitle: "newwwww",
        file: "http://localhost",
        tracks: [
                  {
                    trackId: "56464654",
                    trackTitle: "track title 1",
                  },
                  {
                    trackId: "654964984684",
                    trackTitle: "track title 2",
                  },
                  {
                    trackId: "687984684684",
                    trackTitle: "track title 3",
                  },
                ],
        userId: "989898989",
        artist: "artist name",
      })
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toEqual("artist name");
        expect(responseBody.tracks.length).toEqual(3);
      })
      .expect(201);
  });
});
