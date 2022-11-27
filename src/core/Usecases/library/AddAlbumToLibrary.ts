import { AlbumRepository } from "./../../repositories/AlbumRepository";
import { LibraryRepository } from "../../repositories/LibraryRepository";
import { Library } from "./../../Entities/Library";
import { UseCase } from "./../Usecase";
export type AddAlbumToLibraryInput = {
  title: string;
  userId: string;
};
export class AddAlbumToLibrary
  implements UseCase<AddAlbumToLibraryInput, Promise<Library>>
{
  constructor(
    private readonly libraryRepository: LibraryRepository,
    private readonly albumRepository: AlbumRepository
  ) {}
  async execute(input: AddAlbumToLibraryInput): Promise<Library> {
    const library = await this.libraryRepository.getByUserId(input.userId);
    const album = await this.albumRepository.getAlbumByTitle(input.title);
    const canAddAlbum = library.canAddAlbum(album.props.albumId);
    if (!canAddAlbum) {
      throw new Error("album already added");
    }

    library.addAlbum({
      albumId: album.props.albumId,
      title: album.props.albumTitle,
    });

    await this.libraryRepository.update(library);
    return Promise.resolve(library);
  }
}
