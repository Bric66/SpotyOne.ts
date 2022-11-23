import { UpdateAlbum } from "./../../Usecases/album/UpdateAlbum";
import { Album } from "../../Entities/Album";
import { InMemoryAlbumRespository } from "../adapters/repositories/InMemoryAlbumRespository";

const db = new Map<string, Album>();

describe("unit - UpdateAlbum", () => {
  let updateAlbum: UpdateAlbum;
  let album: Album;

  beforeAll(() => {
    album = new Album({
      albumId: "12345",
      userId: "userId",
      albumTitle: "Album Title",
      artist: "Album Artist",
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
    updateAlbum = new UpdateAlbum(inMemoryAlbumRespository);
    db.set(album.props.albumId, album);
  });
  it("should update the album", async () => {
    const result = await updateAlbum.execute({
      file: "hhtp://../updated",
      tracks: {
        trackId: "new id",
        trackTitle: "new title",
      },

      albumTitle: "updated title",
      artist: "updated artist",
      userId: "userId",
    });
    expect(result.props.albumTitle).toEqual("updated title");
    expect(result.props.tracks).toHaveLength(4);
  });
});