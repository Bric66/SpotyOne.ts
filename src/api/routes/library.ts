import * as express from "express";
import { authorization } from "../middlewares/JwtAuthorizationMiddleware";
const libraryRouter = express.Router()

libraryRouter.use(authorization);

libraryRouter.post("/", async (req, res) => {

})



export { libraryRouter }