import { IdGateway } from "./../../gateways/IdGateway";
import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { Album, TrackProperties } from "../../Entities/Album";
import { UseCase } from "../Usecase";

export type AlbumInput = {
  albumId: string;
  userId: string;
  albumTitle: string;
  file: string;
  tracks: Array<TrackProperties>;
};

export type CreateAlbumPropertiesInput = {
  userId: string,
  artist: string,
  albumTitle: string,
  file: string,
  tracks: Array<TrackProperties>,
}
export class CreateAlbum implements UseCase<CreateAlbumPropertiesInput, Promise<Album>> {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly idGateway: IdGateway
  ) {}

  async execute(input: CreateAlbumPropertiesInput): Promise<Album> {
    const isAlreadyCreated = await this.albumRepository.exist(
      input.albumTitle,
      input.artist
    );
    if (isAlreadyCreated) {
      throw new Error("Album already exists");
    }
    const albumId = this.idGateway.generate();
    const album = Album.create({
      albumId: albumId,
      userId: input.userId,
      artist: input.artist,
      albumTitle: input.albumTitle,
      file: input.file,
      tracks: input.tracks,
    });
    await this.albumRepository.create(album);
    return album;
  }
}
