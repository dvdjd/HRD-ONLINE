const MYSQL_POST = require("../models/MYSQL_POST")

module.exports = class loginClass {
    constructor(item_information, item_file = {}) {
        this.mysql_post = new MYSQL_POST();
        this.item_information = item_information;
        this.item_file = item_file;
    }

    async post() {
        let res = {};
        let upload_file = {};
        try {
            res.data = await this.mysql_post.post(this.item_information);

            for (let i = 0; i < this.item_file.length; i++) {
                upload_file = await this.mysql_post.upload(this.item_information, this.item_file[i])
            }

            res.file_uploaded = upload_file;

            res.status = "success";

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async getPosts() {
        let res = {};

        try {
            let post = await this.mysql_post.getPosts();

            for (let i = 0; i < post.length; i++) {
                let file = [];
                let files = await this.mysql_post.getUploadFiles(post[i].ID)

                for (let j = 0; j < files.length; j++) {
                    file.push({ type: files[j].uploadFileType, filename: files[j].uploadFileName })
                }

                post[i].file = file

            }

            res.data = post;

            res.status = "success";

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async removePost() {
        let res = {};

        try {
            res.data = await this.mysql_post.removePost(this.item_information);

            res.status = "success";

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

}