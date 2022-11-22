import { IdGateway } from './../../gateways/IdGateway';
import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { Album, TrackProperties } from "../../Entities/Album";
import { UseCase } from "../Usecase";

export type AlbumInput = {
  albumId: string;
  userId: string;  
  albumTitle: string;
  file: string;
  tracksCount: number;
  totalDuration: number;
  tracks: Array<TrackProperties>;
}

export class CreateAlbum implements UseCase<Album, Promise<Album>> {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly idGateway: IdGateway,
    ) {}

  execute(input: Album): Promise<Album> {
    const albumId = this.idGateway.generate()
    const album = Album.create({
      albumId: albumId,
      userId: input.props.userId,
      albumTitle: input.props.albumTitle,
      file: input.props.file,
      tracks: input.props.tracks,
      tracksCount: input.props.tracksCount,
      totalDuration: input.props.totalDuration,
    });
    this.albumRepository.create(album)
    return Promise.resolve(album);
  }
}
