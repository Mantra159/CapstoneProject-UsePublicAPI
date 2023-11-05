import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`server running on port ${port}.`)
})