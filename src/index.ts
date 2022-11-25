import "dotenv/config";
import express from "express";
import * as mongoose from "mongoose";
import { trackRouter } from "./api/routes/track";
import { libraryRouter } from "./api/routes/library";
import { albumRouter } from "./api/routes/album";
import { userRouter } from "./api/routes/user";
const port = +process.env.PORT_KEY;

mongoose.connect("mongodb://127.0.0.1:27017/spotyone_data", (err) => {
  if (err) {
    throw err;
  }
  console.info("Connected to mongodb");
});

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/track", trackRouter);

app.use("/album", albumRouter);

app.use("/library", libraryRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
