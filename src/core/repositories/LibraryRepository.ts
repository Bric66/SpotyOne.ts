import { UpdateLibraryInput } from "../Usecases/library/UpdateLibrary";
import { Library } from "./../Entities/Library";

export interface LibraryRepository {
  create(library: Library): Promise<Library>;

  getByUserId(userId: string): Promise<Library>;

  update(input: UpdateLibraryInput): Promise<Library>;

  delete(libraryId: string): string;
}
