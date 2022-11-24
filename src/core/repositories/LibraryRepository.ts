import { Library } from "./../Entities/Library";

export interface LibraryRepository {
  create(library: Library): Promise<Library>;

  getByUserId(userId: string): Promise<Library>;

  update(input: Library): Promise<Library>;

  delete(input: string): Promise<void>;

}
