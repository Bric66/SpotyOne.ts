import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { UseCase } from "../Usecase";

export class DeleteAlbum implements UseCase<string, void> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(albumId: string): Promise<void> {
    this.albumRepository.deleteAlbum(albumId);
    return;
  }
}
