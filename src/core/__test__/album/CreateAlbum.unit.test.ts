import { InMemoryAlbumRespository } from "./../adapters/repositories/InMemoryAlbumRespository";
import { UuidGateway } from "./../adapters/gateways/UuidGateway";
import { Album } from "../../Entities/Album";
import { CreateAlbum } from "../../Usecases/album/CreateAlbum";

const db = new Map<string, Album>();

describe("Unit - CreateAlbum", () => {
  let createAlbum: CreateAlbum;
  let album: Album;

  beforeAll(() => {
    album = new Album({
      albumId: "",
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
      totalDuration: 1547,
      tracksCount: 3,
    });
    const inMemoryAlbumRespository = new InMemoryAlbumRespository(db);
    const uuidGateway = new UuidGateway();
    createAlbum = new CreateAlbum(inMemoryAlbumRespository, uuidGateway);
  });
  beforeEach(() => {
      db.clear()
  });

  it("should create un album", async () => {
    const result = await createAlbum.execute(album);
    expect(result.props.albumTitle).toEqual("Album Title");
    expect(result.props.artist).toEqual("Artist");
  });

  it("should throw error if album already exists", async () => {
    await createAlbum.execute(album);
    const result = () => createAlbum.execute(album);
    expect(async () => await result()).rejects.toThrow();
  });
});
