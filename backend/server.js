const express = require("express");
const app = express();
const cors = require("cors");
const loginController = require("./controllers/loginController");
const birthdayController = require("./controllers/birthdayController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");
const reactController = require("./controllers/reactController");
const hrUploadController = require("./controllers/hrUploadController");
const emailController = require("./controllers/emailController");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/public/files'));
app.use('/hr_uploads', express.static(__dirname + '/public/hr_uploads'));

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

//HR UPLOADS
app.post("/hrUpload", hrUploadController.upload);
app.post("/getHrUpload", hrUploadController.getUpload);
app.post("/getUploadItems", hrUploadController.getUploadItems);
app.post("/updateItem", hrUploadController.updateItem);
app.post("/removeItem", hrUploadController.removeItem);
app.post("/getByMenu", hrUploadController.getByMenu);

//Send mail
app.post("/sendMail", emailController.sendMail)

app.listen(5010, (err) => {
    if (err) throw err;
    console.log("Running on port 4000.");
});