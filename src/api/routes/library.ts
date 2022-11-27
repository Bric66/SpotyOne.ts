import * as express from "express";
import { MongoDbLibraryRepository } from "../../adapters/repositories/mongoDb/MongoDbLibraryRepository";
import { MongoDbTrackRepository } from "../../adapters/repositories/mongoDb/MongoDbTrackRepository";
import { AuthentifiedRequest } from "../types/AuthentifiedRequest";
import { AddTrackToLibrary } from "../../core/Usecases/library/AddTrackIdtoLibrary";
import { authorization } from "../middlewares/JwtAuthorizationMiddleware";
import { MongoDbAlbumRepository } from "../../adapters/repositories/mongoDb/MongoDbAlbumRepository";
import { AddAlbumToLibrary } from "../../core/Usecases/library/AddAlbumToLibrary";
import { GetLibraryByUserId } from "../../core/Usecases/library/GetLibraryByUserId";
import { UpdateLibrary } from "../../core/Usecases/library/UpdateLibrary";
const libraryRouter = express.Router();
const mongoDbLibraryRepository = new MongoDbLibraryRepository();
const mongoDbTrackRepository = new MongoDbTrackRepository();
const mongoDbAlbumRepository = new MongoDbAlbumRepository();
const addTrackToLibrary = new AddTrackToLibrary(
  mongoDbLibraryRepository,
  mongoDbTrackRepository
);
const addAlbumToLibrary = new AddAlbumToLibrary(
  mongoDbLibraryRepository,
  mongoDbAlbumRepository
);
const getLibraryByUserId = new GetLibraryByUserId(mongoDbLibraryRepository);
const updateLibrary = new UpdateLibrary(mongoDbLibraryRepository)

libraryRouter.use(authorization);

libraryRouter.post("/track", async (req: AuthentifiedRequest, res) => {
  const body = {
    userId: req.user.id,
    trackTitle: req.body.trackTitle,
  };

  const library = await addTrackToLibrary.execute(body);

  return res.status(201).send(library.props);
});

libraryRouter.post("/album", async (req: AuthentifiedRequest, res) => {
  const body = {
    title: req.body.title,
    userId: req.user.id,
  };

  const library = await addAlbumToLibrary.execute(body);

  return res.status(201).send(library.props);
});

libraryRouter.get("/:id", async (req: AuthentifiedRequest, res) => {
  const userId = req.user.id;

  const library = await getLibraryByUserId.execute(userId);

  return res.status(200).send(library.props);
});

libraryRouter.patch("/", async (req: AuthentifiedRequest, res) => {
    const body = {
        userId: req.user.id,
        title: req.body.title,
    }
  
    const library = await updateLibrary.execute(body);
  
    return res.status(200).send(library.props);
  });

export { libraryRouter };
