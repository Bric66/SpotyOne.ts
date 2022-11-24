import { V4IdGateway } from './../../adapters/gateways/V4IdGateway';
import { MongoDbAlbumRepository } from './../../adapters/repositories/mongoDb/MongoDbAlbumRepository';
import { CreateAlbum } from './../../core/Usecases/album/CreateAlbum';
import { AuthentifiedRequest } from './../types/AuthentifiedRequest';
import * as express from "express";
import { authorization } from '../middlewares/JwtAuthorizationMiddleware';
const albumRouter = express.Router()
const mongoDbAlbumRepository = new MongoDbAlbumRepository()
const v4Gateway = new V4IdGateway
const createAlbum = new CreateAlbum(mongoDbAlbumRepository, v4Gateway)
albumRouter.use(authorization)

albumRouter.post("/create", async (req: AuthentifiedRequest, res) => {
const body = {
    albumTitle: req.body.albumTitle,
    file: req.body.file,
    tracks: req.body.tracks,
    userId: req.user.id
    }
    const album = await createAlbum.execute(body)
    return res.status(200).send();
})

export { albumRouter } 