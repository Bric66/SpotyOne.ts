import { IdGateway } from './../../gateways/IdGateway';
import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { Album, TrackProperties } from "../../Entities/Album";
import { UseCase } from "../Usecase";

export type AlbumInput = {
  albumId: string;
  userId: string;  
  albumTitle: string;
  file: string;
  tracks: Array<TrackProperties>;
}

export class CreateAlbum implements UseCase<Album, Promise<Album>> {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly idGateway: IdGateway,
    ) {}

  async execute(input: Album): Promise<Album> {
    const isAlreadyCreated = await this.albumRepository.exist(input.props.albumTitle, input.props.artist)
    if (isAlreadyCreated) {
      throw new Error('Album already exists')
    }
    const albumId = this.idGateway.generate()
    const album = Album.create({
      albumId: albumId,
      userId: input.props.userId,
      artist: input.props.artist,
      albumTitle: input.props.albumTitle,
      file: input.props.file,
      tracks: input.props.tracks,
    });
    await this.albumRepository.create(album)
    return input;
  }
}

