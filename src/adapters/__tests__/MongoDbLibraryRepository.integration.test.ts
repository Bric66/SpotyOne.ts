import { LibraryModel } from "./../repositories/mongoDb/models/library";
import { v4 } from "uuid";
import mongoose from "mongoose";
import { MongoDbLibraryRepository } from "./../repositories/mongoDb/MongoDbLibraryRepository";
import { Library } from "./../../core/Entities/Library";

describe("Integration - MongoDbLibratryRepository", () => {
  let library: Library;
  let mongonDbLibraryRepository: MongoDbLibraryRepository;

  beforeAll(async () => {
    const databaseId = v4();
    mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
      if (err) {
        throw err;
      }
      console.info("Connected to mongodb");
    });
    mongonDbLibraryRepository = new MongoDbLibraryRepository();
    library = Library.create({
      userId: "7777",
      libraryId: "9999",
      title: "library title",
    });
  });

  beforeEach(async () => {
    await mongonDbLibraryRepository.create(library);
  });

  afterEach(async () => {
    await LibraryModel.collection.drop();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create a library", async () => {
    await mongonDbLibraryRepository.create(library);
  });

  it("should get a library by userId ", async () => {
    const result = await mongonDbLibraryRepository.getByUserId("7777");
    expect(result.props.libraryId).toEqual("9999");
  });

  it("shoul throw if userId does not exist", async () => {
    const result = () => mongonDbLibraryRepository.getByUserId("false ID");
    await expect(() => result()).rejects.toThrow();
  })
  
  it("should update a librrary", async () => {
    library.update({
      title: "new library title",
    });
    const result = await mongonDbLibraryRepository.update(library);
    expect(result.props.title).toEqual("new library title");
  });

  it("should delete a library", async () => {
    await mongonDbLibraryRepository.delete("9999");
    const result = () => mongonDbLibraryRepository.getByUserId("7777");
    await expect(() => result()).rejects.toThrow();
  });
});
