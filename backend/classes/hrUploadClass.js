const MYSQL_HR_UPLOADS = require("../models/MYSQL_HR_UPLOADS");

module.exports = class hrUploadClass {
    constructor(item_information, item_file = {}) {
        this.mysql_hr_uploads = new MYSQL_HR_UPLOADS();
        this.item_information = item_information;
        this.item_file = item_file;
    }

    async upload() {
        let res = {};

        try {
            res.data = await this.mysql_hr_uploads.upload(this.item_information, this.item_file);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async getUpload() {
        let res = {};

        try {
            res.data = await this.mysql_hr_uploads.getUpload(this.item_information);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }
}