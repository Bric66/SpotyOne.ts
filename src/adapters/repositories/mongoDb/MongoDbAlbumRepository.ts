import { Album } from "../../../core/Entities/Album";
import { AlbumRepository } from "../../../core/repositories/AlbumRepository";
import { AlbumModel } from "./models/album";

export class MongoDbAlbumRepository implements AlbumRepository {
  async create(album: Album): Promise<Album> {
    const albumModel = new AlbumModel(album.props);
    await albumModel
      .save()
      .then(() => console.log("Album created successfully"));
    return Promise.resolve(album);
  }

  updateAlbum(input: Album): Promise<Album> {
    throw new Error("Method not implemented.");
  }

  getAlbumById(albumId: string): Promise<Album> {
    throw new Error("Method not implemented.");
  }

  getAlbumByUserId(userId: string): Promise<Album> {
    throw new Error("Method not implemented.");
  }

  getAlbums(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }

  getAlbumByTitle(albumTitle: string): Promise<Album> {
    throw new Error("Method not implemented.");
  }

  async exist(albumTitle: string, artist: string): Promise<boolean> {
    const albumExist = await AlbumModel.findOne({
      albumTitle: albumTitle,
      artist: artist,
    });
    if (albumExist) {
      return true;
    }
    return false;
  }

  deleteAlbum(albumId: string): string {
    throw new Error("Method not implemented.");
  }
}
