import { MongoDbAlbumRepository } from "./../../adapters/repositories/mongoDb/MongoDbAlbumRepository";
import { Album } from "./../../core/Entities/Album";
import { AlbumRepository } from "./../../core/repositories/AlbumRepository";
import "dotenv/config";
import { TrackModel } from "./../../adapters/repositories/mongoDb/models/track";
import { UserModel } from "./../../adapters/repositories/mongoDb/models/user";
import { MongoDbUserRepository } from "./../../adapters/repositories/mongoDb/MongoDbUserRepository";
import { User } from "./../../core/Entities/User";
import { UserRepository } from "./../../core/repositories/UserRepository";
import { MongoDbTrackRepository } from "./../../adapters/repositories/mongoDb/MongoDbTrackRepository";
import { Track } from "./../../core/Entities/Track";
import { TrackRepository } from "./../../core/repositories/TrackRepository";
import { v4 } from "uuid";
import { Library } from "./../../core/Entities/Library";
import { LibraryRepository } from "./../../core/repositories/LibraryRepository";
import { MongoDbLibraryRepository } from "./../../adapters/repositories/mongoDb/MongoDbLibraryRepository";
import { libraryRouter } from "../routes/library";
import { sign } from "jsonwebtoken";
import express from "express";
import mongoose from "mongoose";
import supertest from "supertest";
import { LibraryModel } from "../../adapters/repositories/mongoDb/models/library";

const app = express();

describe("E2E Library router", () => {
  let libraryRepository: LibraryRepository;
  let trackRepository: TrackRepository;
  let userRepository: UserRepository;
  let albumRepository: AlbumRepository;
  let library: Library;
  let track: Track;
  let user: User;
  let album: Album;
  let accessKey;

  beforeAll(async () => {
    accessKey = sign(
      {
        id: "12345",
        userName: "user.props.userName",
        email: "user.props.emai",
        userLibraryId: "9999",
      },
      "maytheforcebewithyou"
    );

    app.use(express.json());
    app.use("/library", libraryRouter);

    const databaseId = v4();
    mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
      if (err) {
        throw err;
      }
      console.info("Connected to mongodb");
    });
    trackRepository = new MongoDbTrackRepository();
    libraryRepository = new MongoDbLibraryRepository();
    userRepository = new MongoDbUserRepository();
    albumRepository = new MongoDbAlbumRepository();

    library = new Library({
      userId: "12345",
      libraryId: "9999",
      title: "my library title",
      albums: [
        {
          albumId: "5555",
          title: "album title",
        },
      ],
      tracks: [
        {
          trackId: "6666",
          title: "title name ",
        },
      ],
    });
    track = new Track({
      trackId: "11111",
      trackTitle: "new track title",
      artist: "new artist name",
      duration: 500,
      file: "http://new-track",
      created: new Date(),
      updated: null,
      userId: "789456413",
    });
    user = new User({
      id: "12345",
      userName: "new user name",
      email: "new@gmail.com",
      password: "12345",
      created: new Date(),
      updated: null,
      libraryId: "9999",
    });
    album = Album.create({
      albumId: "1234",
      userId: "1463165",
      albumTitle: "Album Title",
      artist: "Artist",
      file: "hhtp://../album",
      tracks: [
        {
          trackId: "132354",
          trackTitle: "title",
        },
        {
          trackId: "789798",
          trackTitle: "title",
        },
        {
          trackId: "4654654687",
          trackTitle: "title",
        },
      ],
    });
  });

  beforeEach(async () => {
    await libraryRepository.create(library);
    await trackRepository.create(track);
    await userRepository.create(user);
    await albumRepository.create(album);
  });

  afterEach(async () => {
    await LibraryModel.collection.drop();
    await TrackModel.collection.drop();
    await UserModel.collection.drop();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should post /track", async () => {
    await supertest(app)
      .post("/library/track")
      .set("access_key", accessKey)
      .send({
        userId: "12345",
        trackTitle: "new track title",
      })
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.tracks).toHaveLength(2);
      });
  });

  it("should post /album", async () => {
    await supertest(app)
      .post("/library/album")
      .set("access_key", accessKey)
      .send({
        userId: "12345",
        title: "Album Title",
      })
      .expect((response) => {
        console.log(response);
        const responseBody = response.body;
        expect(responseBody.albums).toHaveLength(2);
      });
  });

  it("should get /:userId", async () => {
    await supertest(app)
      .get(`/library/${user.props.id}`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.title).toEqual("my library title");
      });
  });

  it("should patch /library", async () => {
    await supertest(app)
        .patch("/library")
        .set("access_key", accessKey)
        .send({
            title: "new library title"
        })
        .expect((response) => {
            const responseBody = response.body;
            expect(responseBody.title).toEqual("new library title");
        })
  }); 
});