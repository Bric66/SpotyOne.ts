import * as express from "express";
import {authorization} from "../middlewares/JwtAuthorizationMiddleware";
import {AuthentifiedRequest} from "../types/AuthentifiedRequest";
import {CreateTrack} from "../../core/Usecases/track/CreateTrack";
import {MongoDbTrackRepository} from "../../adapters/repositories/mongoDb/MongoDbTrackRepository";
import {V4IdGateway} from "../../adapters/gateways/V4IdGateway";
import {GetTrackByTitle} from "../../core/Usecases/track/GetTrackByTitle";
import {UpdateTrack} from "../../core/Usecases/track/UpdateTrack";
import {DeleteTrack} from "../../core/Usecases/track/DeleteTrack";
import {GetTracks} from "../../core/Usecases/track/GetTracks";
import { GetTracksByDescendingDate } from "../../core/Usecases/track/GetTracksByDescendingDate";

const trackRouter = express.Router()

trackRouter.use(authorization);

const mongoDbTrackRepository = new MongoDbTrackRepository();
const v4IdGateway = new V4IdGateway();
const createTrack = new CreateTrack(mongoDbTrackRepository, v4IdGateway)
const getTrackByTitle = new GetTrackByTitle(mongoDbTrackRepository)
const getTracks = new GetTracks(mongoDbTrackRepository)
const updateTrack = new UpdateTrack(mongoDbTrackRepository)
const deleteTrack = new DeleteTrack(mongoDbTrackRepository)
const getTracksByDescendingDate = new GetTracksByDescendingDate(mongoDbTrackRepository)

trackRouter.post("/create", async (req: AuthentifiedRequest, res) => {
    const body = {
        trackTitle: req.body.trackTitle,
        artist: req.body.artist,
        duration: req.body.duration,
        file: req.body.file,
        userId: req.user.id
    };
    const track = await createTrack.execute(body);
    return res.status(201).send(track.props);
});

trackRouter.get("/title/:title", async (req: AuthentifiedRequest, res) => {
    const title = req.params.title;
    const track = await getTrackByTitle.execute(title);
    return res.status(200).send(track.props);
});

trackRouter.get("/all", async (req: AuthentifiedRequest, res) => {
    const albums = await getTracks.execute();
    return res.status(200).send(albums);
});

trackRouter.get("/date", async (req: AuthentifiedRequest, res) => {
    const albums = await getTracksByDescendingDate.execute();
    return res.status(200).send(albums);
});

trackRouter.patch("/", async (req: AuthentifiedRequest, res) => {
    const body = {
        trackTitle: req.body.trackTitle,
        duration: req.body.duration,
        artist: req.body.artist,
        file: req.body.file,
    };

    const updatedTrack = await updateTrack.execute({
        trackTitle: body.trackTitle,
        duration: body.duration,
        artist: body.artist,
        file: body.file,
        userId: req.user.id
    });

    return res.status(200).send(updatedTrack.props);
});

trackRouter.delete("/:id", async (req: AuthentifiedRequest, res) => {
    const body = {
        trackId: req.body.albumId,
    };

    await deleteTrack.execute(body.trackId);

    res.sendStatus(200);
});

export {trackRouter}