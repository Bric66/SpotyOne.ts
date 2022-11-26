import { Album } from "../../Entities/Album";
import { AlbumRepository } from "../../repositories/AlbumRepository";
import { UseCase } from "../Usecase";

export class GetAlbumByTitle implements UseCase<string, Promise<Album>> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(albumTitle: string): Promise<Album> {
    const album = await this.albumRepository.getAlbumByTitle(albumTitle);
    return Promise.resolve(album);
  }
}
