import express from "express";

const app = express();

const port = 3004;

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('ok');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})