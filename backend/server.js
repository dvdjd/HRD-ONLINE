const express = require("express");
const app = express();
const { request } = require("./config")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(4000, (err) => {
    if (err) throw err;
    console.log("Running on port 4000.");
});