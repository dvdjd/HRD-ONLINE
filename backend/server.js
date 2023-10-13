const express = require("express");
const app = express();
const cors = require("cors");
const loginController = require("./controllers/loginController");
const birthdayController = require("./controllers/birthdayController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");
const reactController = require("./controllers/reactController");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/public/files'));

app.post("/login", loginController.login);
app.post("/birthday", birthdayController.getBirthday);
app.post("/getUser", loginController.getUser);

app.post("/post", postController.post);
app.post("/getPosts", postController.getPosts);
app.post("/removePost", postController.removePost);
app.post("/react", reactController.react);
app.post("/countReact", reactController.countReact);
app.post("/checkReact", reactController.checkReact);
app.post("/getReact", reactController.getReact);
app.post("/comment", commentController.comment);
app.post("/getComments", commentController.getComments);

app.listen(4000, (err) => {
    if (err) throw err;
    console.log("Running on port 4000.");
});