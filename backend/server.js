const express = require("express");
const app = express();
const cors = require("cors");
const loginController = require("./controllers/loginController");
const birthdayController = require("./controllers/birthdayController");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post("/login", loginController.login);
app.post("/birthday", birthdayController.getBirthday);

app.listen(4000, (err) => {
    if (err) throw err;
    console.log("Running on port 4000.");
});