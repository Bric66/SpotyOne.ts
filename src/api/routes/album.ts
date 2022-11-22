import { AuthentifiedRequest } from './../types/AuthentifiedRequest';
import * as express from "express";
import { authorization } from '../middlewares/JwtAuthorizationMiddleware';
const albumRouter = express.Router()

albumRouter.use(authorization)

albumRouter.post("/create", async (req: AuthentifiedRequest, res) => {
const body = {
    albumTitle: req.body.albumTitle,
    file: req.body.file,
    tracks: req.body.tracks,
    userId: req.user.id
    }
})

export { albumRouter } 