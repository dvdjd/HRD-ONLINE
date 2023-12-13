const MYSQL_POST = require("../models/MYSQL_POST")

module.exports = class loginClass {
    constructor(item_information, item_file = {}) {
        this.mysql_post = new MYSQL_POST();
        this.item_information = item_information;
        this.item_file = item_file;
    }

    async getPostID() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const yy = year.toString().slice(-2);
        const mm = month < 10 ? '0' + month : month;
        let post_id;
        let control_no;

        let res = {};
        this.item_information = {
            prefix: yy + mm
        }

        try {
            res.data = await this.mysql_post.getPostID(this.item_information);

            if (res.data[0].control_no == null) {
                control_no = 1;
            } else {
                post_id = res.data.control_no.toString();
                control_no = post_id.slice(-4);
                control_no = parseInt(control_no, 10);
                control_no = control_no + 1;
            }
            post_id = yy + mm + control_no.toString().padStart(4, '0');

            res.control_no = post_id;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async post() {
        let res = {};
        let upload_file = {};
        try {
            let control_no = (await this.getPostID()).control_no;
            console.log('this.control_no', control_no);
            let item_information = {
                ...this.item_information,
                control_no: control_no
            }
            res.data = await this.mysql_post.post(item_information);

            for (let i = 0; i < this.item_file.length; i++) {
                upload_file = await this.mysql_post.upload(item_information, this.item_file[i])
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
                let files = await this.mysql_post.getUploadFiles(post[i].postID)

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