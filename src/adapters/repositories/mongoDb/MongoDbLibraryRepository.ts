import { LibraryProperties } from "./../../../core/Entities/Library";
import { LibraryModel } from "./models/library";
import { Library } from "../../../core/Entities/Library";
import { LibraryRepository } from "./../../../core/repositories/LibraryRepository";

export class MongoDbLibraryRepository implements LibraryRepository {
  async create(library: Library): Promise<Library> {
    const libraryModel = new LibraryModel(library.props);
    await libraryModel
      .save()
      .then(() => console.log("library created successfully"));
    return library;
  }

  async getByUserId(userId: string): Promise<Library> {
    const library = await LibraryModel.findOne({ userId: userId });
    if (!library) {
      throw new Error("cannto found library");
    }
    const libraryProperties: LibraryProperties = {
      libraryId: library.libraryId,
      userId: library.userId,
      title: library.title,
      albums: library.albums,
      tracks: library.tracks,
    };
    return new Library(libraryProperties);
  }

  async update(input: Library): Promise<Library> {
    await LibraryModel.findOneAndUpdate(
      { userId: input.props.userId },
      {
        $set: {
          title: input.props.title,
        },
      }
    );
    return input;
  }

  async delete(input: string): Promise<void> {
    await LibraryModel.deleteOne({ libraryId: input });
    return;
  }
}
