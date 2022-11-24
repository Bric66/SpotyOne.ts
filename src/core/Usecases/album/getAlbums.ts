import { AlbumRepository } from "../../repositories/AlbumRepository";
import { UseCase } from "../Usecase";

export class GetAlbums implements UseCase<void, Promise<string[]>> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(): Promise<string[]> {
    const albumArray = await this.albumRepository.getAlbums();
    return albumArray;
  }
}