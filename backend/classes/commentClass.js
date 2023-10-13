const MYSQL_COMMENTS = require("../models/MYSQL_COMMENTS")

module.exports = class commentClass {
    constructor(item_information, item_file = {}) {
        this.mysql_comments = new MYSQL_COMMENTS();
        this.item_information = item_information;
    }

    async comment() {
        let res = {};
        try {
            res.data = await this.mysql_comments.comment(this.item_information);

            res.status = "success";

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async getComments() {
        let res = {};

        try {
            res.data = await this.mysql_comments.getComments(this.item_information);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }


}