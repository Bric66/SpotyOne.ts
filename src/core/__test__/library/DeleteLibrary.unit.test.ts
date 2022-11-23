import {Library} from "../../Entities/Library";
import {InMemoryLibraryRepository} from "../adapters/repositories/InMemoryLibraryRepository";
import {DeleteLibrary} from "../../Usecases/library/DeleteLibrary";
import {UuidGateway} from "../adapters/gateways/UuidGateway";


const dbDeleteLibrary = new Map<string, Library>();

describe("When I call DeleteLibrary ====>", () => {
    const inMemoryLibraryRepository = new InMemoryLibraryRepository(dbDeleteLibrary)
    const deleteLibrary = new DeleteLibrary(inMemoryLibraryRepository);
    const uuidGateway = new UuidGateway();
    const id = uuidGateway.generate();

    it("should delete library", async () => {
        const result = await deleteLibrary.execute({
            userId: id,
        })
        await expect(result).toBeFalsy();
    })
})