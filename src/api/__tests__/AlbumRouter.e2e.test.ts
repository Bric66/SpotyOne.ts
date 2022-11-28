import "dotenv/config";
import { AlbumRepository } from "./../../core/repositories/AlbumRepository";
import { AlbumModel } from "./../../adapters/repositories/mongoDb/models/album";
import { Album } from "./../../core/Entities/Album";
import { MongoDbAlbumRepository } from "./../../adapters/repositories/mongoDb/MongoDbAlbumRepository";
import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import express from "express";
import mongoose from "mongoose";
import { albumRouter } from "../routes/album";
import supertest from "supertest";
const app = express();

describe("E2E - Album router", () => {
  let accessKey;
  let album: Album;
  let albumRepository: AlbumRepository;
  let album2 : Album

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

      album2 = new Album({
          albumId: "123456789",
          userId: "userId",
          albumTitle: "Album Title 2",
          artist: "Album Artist 2",
          file: "hhtp://../album",
          tracks:
              [{
                  trackId: "132354",
                  trackTitle: "title"
              },
                  {
                      trackId: "789798",
                      trackTitle: "title"
                  },
                  {
                      trackId: "4654654687",
                      trackTitle: "title"
                  }
              ],
          created: new Date(10),
          updated: null,
      })
    albumRepository = new MongoDbAlbumRepository();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    await AlbumModel.collection.drop();
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

    it("should get /albums by date", async () => {
        await albumRepository.create(album);
        await albumRepository.create(album2);

        await supertest(app)
            .get('/album/date')
            .set("access_key", accessKey)
            .expect((response) => {
                console.log(response)
                const responseBody = response.body;
                expect(responseBody[0]).toEqual({
                    albumTitle: 'Album Title 2',
                    artist: 'Album Artist 2',
                    created: new Date(10)
                });
            })
            .expect(200);
    });

  it("should post /album", async () => {
    await supertest(app)
      .post("/album/")
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

  it("should get /album/:id ", async () => {
    const result = await albumRepository.create(album);
    await supertest(app)
      .get(`/album/${result.props.albumId}`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toEqual("Artist");
        expect(responseBody.userId).toEqual("1463165");
        expect(responseBody.albumId).toEqual("1234");
      });
  });

  it("should get /album/:userId ", async () => {
    const result = await albumRepository.create(album);

    await supertest(app)
      .get(`/album/${result.props.userId}/mine`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toEqual("Artist");
        expect(responseBody.albumId).toBeTruthy();
      })
      .expect(200);
  });

  it("should get /albums", async () => {
    await albumRepository.create(album);
    await supertest(app)
      .get(`/album/`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody).toHaveLength(1);
      })
      .expect(200);
  });



  it("should patch /album", async () => {
    await albumRepository.create(album);
    await supertest(app)
      .patch("/album")
      .set("access_key", accessKey)
      .send({
        file: "http://newFilePath",
        tracks: {
                  trackId: "newId",
                  trackTitle: "new title",
                },
        albumTitle: "new album title",
        artist: "newArtist",
        albumId: "1234",
      })
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toEqual("newArtist");
        expect(responseBody.tracks).toHaveLength(4);
      })
      .expect(200);
  });

  it("should delete /album", async () => {
    await albumRepository.create(album);
    await supertest(app)
      .delete(`/album/${album.props.albumId}`)
      .set("access_key", accessKey)
      .expect((response) => {
        const responseBody = response.body;
        expect(responseBody.artist).toBeFalsy
        expect(responseBody.id).toBeFalsy
      })
      .expect(200);
  });
});
