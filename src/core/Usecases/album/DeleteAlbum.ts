import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { UseCase } from "../Usecase";

export class DeleteAlbum implements UseCase<string, string> {
  constructor(private readonly albumRepository: AlbumRepository) {}

  execute(albumId: string): string {
    this.albumRepository.deleteAlbum(albumId);
    return albumId;
  }
}
