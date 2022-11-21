import { Album } from "../../Entities/Album";
import { AlbumRepository } from "../../repositories/AlbumRepository";
import { UseCase } from "../Usecase";

export class GetAlbumById implements UseCase<string, Promise<Album>> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(albumId: string): Promise<Album> {
    const album = await this.albumRepository.getAlbumById(albumId);
    return Promise.resolve(album);
  }
}
