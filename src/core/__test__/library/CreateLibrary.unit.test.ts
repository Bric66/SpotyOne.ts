import {Library} from "../../Entities/Library";
import {CreateLibrary} from "../../Usecases/library/CreateLibrary";
import {InMemoryLibraryRepository} from "../adapters/repositories/InMemoryLibraryRepository";
import {UuidGateway} from "../adapters/gateways/UuidGateway";

const dbCreateLibrary = new Map<string, Library>();

describe('When I call CreateLibrary ====>', () => {
    const inMemoryLibraryRepository = new InMemoryLibraryRepository(dbCreateLibrary);
    const uuidGateway = new UuidGateway();
    const createLibrary = new CreateLibrary(inMemoryLibraryRepository)

    it('should create library', async () => {
        const result = await createLibrary.execute({
            userId: uuidGateway.generate(),
            title: 'bibliothèque de jojo',
            userLibraryId: uuidGateway.generate(),
        })
        expect(result.props.userId).toBeTruthy();
        expect(result.props.title).toEqual("bibliothèque de jojo");
        expect(result.props.libraryId).toBeTruthy();
    })
})