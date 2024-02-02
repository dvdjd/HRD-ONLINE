const hrUploadClass = require("../classes/hrUploadClass");
const { hr_upload } = require("./../multer");

module.exports = {
    async upload(req, res) {
        hr_upload(req, res, async (err) => {
            let hr_upload_class = new hrUploadClass(req.body, req.file);

            let upload = await hr_upload_class.upload();

            res.send(upload);
        });
    },

    async getUpload(req, res) {
        let hr_upload_class = new hrUploadClass(req.body);

        let uploads = await hr_upload_class.getUpload();

        res.send(uploads);
    },

    async getUploadItems(req, res) {
        let hr_upload_class = new hrUploadClass(req.body);

        let uploads = await hr_upload_class.getUploadItems();

        res.send(uploads);
    },

    async updateItem(req, res) {
        hr_upload(req, res, async (err) => {
            let hr_upload_class = new hrUploadClass(req.body, req.file);

            let upload = await hr_upload_class.updateItem();

            res.send(upload);
        });
    },

    async removeItem(req, res) {

        let hr_upload_class = new hrUploadClass(req.body);

        let remove = await hr_upload_class.removeItem();

        res.send(remove);
    },

    async getByMenu(req, res) {
        let hr_upload_class = new hrUploadClass(req.body);

        let upload = await hr_upload_class.getByMenu();

        res.send(upload);
    }
}