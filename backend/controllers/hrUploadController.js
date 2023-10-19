const hrUploadClass = require("../classes/hrUploadClass");
const { hr_upload } = require("./../multer");

module.exports = {
    async upload(req, res) {
        hr_upload(req, res, async (err) => {
            let hr_upload_class = new hrUploadClass(req.body, req.file);
            console.log(req);
            let upload = await hr_upload_class.upload();

            res.send(upload);
        });
    },

    async getUpload(req, res) {
        let hr_upload_class = new hrUploadClass(req.body);

        let uploads = await hr_upload_class.getUpload();

        res.send(uploads);
    }
}