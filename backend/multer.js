const multer = require("multer");

const storageAttachment = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/files/");
    },
    filename: function (req, file, cb) {
        let ext = "";
        if (file.mimetype == "application/pdf") {
            ext = ".pdf";
        } else if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            ext = ".jpg";
        } else if (file.mimetype == "video/mp4") {
            ext = ".mp4";
        }

        cb(null, Date.now() + ext);
    }
});

let upload = multer({ storage: storageAttachment }).array("files");

module.exports = {
    upload
}