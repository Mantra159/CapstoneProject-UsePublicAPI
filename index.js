import express from "express";
import bodyParser from "body-parser";
import * as fs from 'fs';
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

function todaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Note: Months are zero-indexed
    let day = today.getDate();

    // Add leading zero if month or day is a single digit
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function apikey() {
    try {
        // Read the contents of the file synchronously
        const apiKey = fs.readFileSync("APIKEY.txt", 'utf8').trim();

        return apiKey;
    } catch (error) {
        console.error(`Error reading API key from file: ${error.message}`);
        return null;
    }
}

app.get("/", async (req, res) => {
    var apiurl = `https://api.nasa.gov/planetary/apod?api_key=${apikey()}`
    try {
        const response = await axios.get(apiurl);
        var image = response.data.url;
        var description = response.data.explanation;
        var title = response.data.title;
        console.log(result)

    } catch (error) {
        res.status(500);
    };
    res.render("index.ejs", { todaysDate: todaysDate(), image: image, description: description, title: title });

});

app.post('/', async (req, res) => {
    var apiurl = `https://api.nasa.gov/planetary/apod?api_key=${apikey()}&date=${req.body.inputdate}`
    try {
        const response = await axios.get(apiurl);
        var image = response.data.url;
        var description = response.data.explanation;
        var title = response.data.title;
        console.log(result)

    } catch (error) {
        res.status(500);
    };
    res.render("index.ejs", { date: req.body.inputdate, image: image, description: description, title: title });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});