import { MongoDbLibraryMapper } from './mappers/MongoDbLibraryMapper';
import { LibraryModel } from "./models/library";
import { Library } from "../../../core/Entities/Library";
import { LibraryRepository } from "./../../../core/repositories/LibraryRepository";
const mongoDbLibraryMapper = new MongoDbLibraryMapper()

export class MongoDbLibraryRepository implements LibraryRepository {
  async create(library: Library): Promise<Library> {
    const libraryModelMapper = mongoDbLibraryMapper.toLibraryModel(library);
    const libraryModel = new LibraryModel(libraryModelMapper);
    await libraryModel
      .save()
      
    return library;
  }

  async getByUserId(userId: string): Promise<Library> {
    const library = await LibraryModel.findOne({ userId: userId });
    if (!library) {
      throw new Error("cannto found library");
    }
    return mongoDbLibraryMapper.toLibrary(library)
    
  }

  async update(input: Library): Promise<Library> {
    const libraryModelMapper = mongoDbLibraryMapper.toLibraryModel(input)
    await LibraryModel.findOneAndUpdate(
      { userId: libraryModelMapper.userId },
      {
        $set: {
          title: libraryModelMapper.title,
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
