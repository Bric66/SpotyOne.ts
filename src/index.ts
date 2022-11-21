import express from "express";
const port = +process.env.PORT_KEY;
import * as mongoose from "mongoose";
import {userRouter} from "./api/routes/user";

mongoose.connect('mongodb://127.0.0.1:27017/spotyone_data', (err) => {
    if (err) {
        throw err;
    }
    console.info("Connected to mongodb")
})

const app = express();

app.use(express.json());

app.use("/user",userRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})