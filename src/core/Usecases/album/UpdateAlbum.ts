import { TrackProperties } from "./../../Entities/Album";
import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { UseCase } from "./../Usecase";
import { Album } from "../../Entities/Album";

export type UpdateAlbumInput = {
  file: string;
  tracks: Array<TrackProperties>;
  albumTitle: string;
  userId: string;
};

export class UpdateAlbum implements UseCase<UpdateAlbumInput, Promise<Album>> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(input: UpdateAlbumInput): Promise<Album> {
    const album = await this.albumRepository.getAlbumByUserId(input.userId);
    album.update({
      albumTitle: input.albumTitle,
      file: input.file,
      tracks: input.tracks,
    });

    this.albumRepository.updateAlbum({
      albumTitle: album.props.albumId,
      file: album.props.file,
      tracks: album.props.tracks,
      userId: album.props.userId,
    });

    return Promise.resolve(album);
  }
}
