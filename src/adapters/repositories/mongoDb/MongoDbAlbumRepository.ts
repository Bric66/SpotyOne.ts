import { Album, AlbumProperties } from "../../../core/Entities/Album";
import { AlbumRepository } from "../../../core/repositories/AlbumRepository";
import { AlbumModel } from "./models/album";

export class MongoDbAlbumRepository implements AlbumRepository {
  async create(album: Album): Promise<Album> {
    const albumModel = new AlbumModel(album.props);
    await albumModel
      .save()
      .then(() => console.log("Album created successfully"));
    return album;
  }

  updateAlbum(input: Album): Promise<Album> {
    AlbumModel.findOneAndUpdate(
      { id: input.props.userId },
      {
        $set: {
          albumTitle: input.props.albumTitle,
          artist: input.props.artist,
          updated: input.props.updated,
          tracks: input.props.tracks,
          file: input.props.file,
        },
      },
      { new: true }
    );
    console.log("Album updated successfully");
    return Promise.resolve(input);
  }

  async getAlbumById(albumId: string): Promise<Album> {
    const album = await AlbumModel.findOne({ albumId: albumId });
    if (!album) {
      throw new Error("Album not found");
    }
    const albumProperties: AlbumProperties = {
      albumId: album.albumId,
      artist: album.artist,
      albumTitle: album.albumTitle,
      file: album.file,
      tracks: album.tracks,
      created: album.created,
      updated: album.updated,
      userId: album.userId,
    };
    const albumFound = new Album(albumProperties);
    return albumFound;
  }

  async getAlbumByUserId(userId: string): Promise<Album> {
    const album = await AlbumModel.findOne({ userId: userId });
    if (!album) {
      throw new Error("Album not found");
    }
    const albumProperties: AlbumProperties = {
      albumId: album.albumId,
      artist: album.artist,
      albumTitle: album.albumTitle,
      file: album.file,
      tracks: album.tracks,
      created: album.created,
      updated: album.updated,
      userId: album.userId,
    };
    const albumFound = new Album(albumProperties);
    return albumFound;
  }

  async getAlbumByTitle(albumTitle: string): Promise<Album> {
    const album = await AlbumModel.findOne({ albumTitle: albumTitle });
    if (!album) {
      throw new Error("Album not found");
    }
    const albumProperties: AlbumProperties = {
      albumId: album.albumId,
      artist: album.artist,
      albumTitle: album.albumTitle,
      file: album.file,
      tracks: album.tracks,
      created: album.created,
      updated: album.updated,
      userId: album.userId,
    };
    const albumFound = new Album(albumProperties);
    return albumFound;
  }

  async getAlbums(): Promise<Object[]> {
    const albums = await AlbumModel.find();
    const result = albums.map(({ albumTitle, artist, userId }) => ({
      albumTitle,
      artist,
      userId,
    }));
    return result;
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

  async deleteAlbum(albumId: string): Promise<void> {
    await AlbumModel.deleteOne({ id: albumId }).then(() =>
      console.log("Album deleted successfully")
    );
    return;
  }
}
