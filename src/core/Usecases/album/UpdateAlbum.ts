import { GetAlbumById } from './GetAlbumById';
import { TrackProperties } from "./../../Entities/Album";
import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { UseCase } from "./../Usecase";
import { Album } from "../../Entities/Album";

export type UpdateAlbumInput = {
  file: string;
  tracks: TrackProperties;
  albumTitle: string;
  artist: string;
  albumId: string;
};

export class UpdateAlbum implements UseCase<UpdateAlbumInput, Promise<Album>> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(input: UpdateAlbumInput): Promise<Album> {
    const album = await this.albumRepository.getAlbumById(input.albumId);
    album.update({
      albumTitle: input.albumTitle,
      file: input.file,
      tracks: input.tracks,
      artist: input.artist,
    });

    await this.albumRepository.updateAlbum(album);

    return album;
  }
}