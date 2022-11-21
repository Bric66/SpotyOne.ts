import express from "express";

import * as mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/spotyone_data', (err) => {
    if (err) {
        throw err;
    }
    console.info("Connected to mongodb")
})

const app = express();

const port = 3004;

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('ok');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})