import { GetAlbumById } from "./../../core/Usecases/album/GetAlbumById";
import { V4IdGateway } from "./../../adapters/gateways/V4IdGateway";
import { MongoDbAlbumRepository } from "./../../adapters/repositories/mongoDb/MongoDbAlbumRepository";
import { CreateAlbum } from "./../../core/Usecases/album/CreateAlbum";
import { AuthentifiedRequest } from "./../types/AuthentifiedRequest";
import * as express from "express";
import { authorization } from "../middlewares/JwtAuthorizationMiddleware";
import { GetAlbumByUserId } from "../../core/Usecases/album/GetAlbumByUserId";
import { GetAlbums } from "../../core/Usecases/album/getAlbums";
import { UpdateAlbum } from "../../core/Usecases/album/UpdateAlbum";
import { DeleteAlbum } from "../../core/Usecases/album/DeleteAlbum";
import {GetAlbumsByDate} from "../../core/Usecases/album/GetAlbumsByDate";
const albumRouter = express.Router();
const mongoDbAlbumRepository = new MongoDbAlbumRepository();
const v4Gateway = new V4IdGateway();
const createAlbum = new CreateAlbum(mongoDbAlbumRepository, v4Gateway);
const getAlbumById = new GetAlbumById(mongoDbAlbumRepository);
const getAlbumByUserId = new GetAlbumByUserId(mongoDbAlbumRepository);
const getAlbums = new GetAlbums(mongoDbAlbumRepository);
const updateAlbum = new UpdateAlbum(mongoDbAlbumRepository);
const deleteAlbum = new DeleteAlbum(mongoDbAlbumRepository);
const getAlbumsByDate = new GetAlbumsByDate(mongoDbAlbumRepository)

albumRouter.use(authorization);

albumRouter.post("/", async (req: AuthentifiedRequest, res) => {
  const body = {
    albumTitle: req.body.albumTitle,
    file: req.body.file,
    tracks: req.body.tracks,
    userId: req.user.id,
    artist: req.body.artist,
  };
  const album = await createAlbum.execute(body);
  return res.status(201).send(album.props);
});

albumRouter.get("/:id", async (req: AuthentifiedRequest, res) => {
  const albumId = req.params.id;
  const album = await getAlbumById.execute(albumId);
  return res.status(200).send(album.props);
});

albumRouter.get("/:userId/mine", async (req: AuthentifiedRequest, res) => {
  const userId = req.params.userId;
  const album = await getAlbumByUserId.execute(userId);
  return res.status(200).send(album.props);
});

albumRouter.get("/", async (req: AuthentifiedRequest, res) => {
  const album = await getAlbums.execute();
  return res.status(200).send(album);
});

albumRouter.get("/date", async (req: AuthentifiedRequest, res) => {
  const album = await getAlbumsByDate.execute();
  return res.status(200).send(album);
});


albumRouter.patch("/", async (req: AuthentifiedRequest, res) => {
  const body = {
    file: req.body.file,
    tracks: req.body.tracks,
    albumTitle: req.body.albumTitle,
    artist: req.body.artist,
    albumId: req.body.albumId,
  };

  const updatedAlbum = await updateAlbum.execute({
    file: body.file,
    tracks: body.tracks,
    albumTitle: body.albumTitle,
    artist: body.artist,
    albumId: body.albumId,
  });

  return res.status(200).send(updatedAlbum.props);
});

albumRouter.delete("/:id", async (req: AuthentifiedRequest, res) => {
  const body = {
    albumId: req.body.albumId,
  };

  await deleteAlbum.execute(body.albumId);

  res.sendStatus(200);
});
export { albumRouter };
