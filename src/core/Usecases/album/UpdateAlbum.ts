import { TrackProperties } from "./../../Entities/Album";
import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { UseCase } from "./../Usecase";
import { Album } from "../../Entities/Album";

export type UpdateAlbumInput = {
  file: string;
  tracks: TrackProperties;
  albumTitle: string;
  artist: string;
  userId: string;
  updated: Date;
};

export class UpdateAlbum implements UseCase<UpdateAlbumInput, Promise<Album>> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(input: UpdateAlbumInput): Promise<Album> {
    const album = await this.albumRepository.getAlbumByUserId(input.userId);
    album.update({
      albumTitle: input.albumTitle,
      file: input.file,
      tracks: input.tracks,
      artist: input.artist,
      updated : new Date(),
    });

    await this.albumRepository.updateAlbum(album);

    return Promise.resolve(album);
  }
}
