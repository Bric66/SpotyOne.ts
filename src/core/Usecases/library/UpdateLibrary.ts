import { Library } from "../../Entities/Library";
import { LibraryRepository } from "../../repositories/LibraryRepository";
import { UseCase } from "../Usecase";

export type UpdateLibraryInput = {
  userId: string;
  title: string;
};

export class UpdateLibrary
  implements UseCase<UpdateLibraryInput, Promise<Library>>
{
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async execute(input: UpdateLibraryInput): Promise<Library> {
    const library = await this.libraryRepository.getByUserId(input.userId);
    library.update({
      title: input.title
    });

    await this.libraryRepository.update(library);
    return Promise.resolve(library);
  }
}
