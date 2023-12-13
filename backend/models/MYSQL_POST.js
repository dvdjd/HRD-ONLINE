const MODEL = require("./MODEL")

class MYSQL_POST extends MODEL {

    constructor() {
        super('tblpost')
    }

    async getPostID(item_information) {
        let res = await this.query(`SELECT MAX(postID) AS control_no FROM ${this.table} WHERE postID LIKE '%${item_information.prefix}%'`);

        return res;
    }

    async post(item_information) {
        let res = await this.query(`INSERT INTO ${this.table} (postCaption, postDate, postUserID, isDelete) VALUES ('${item_information.caption}', NOW(), '${item_information.user}', 0)`);

        return res;
    }

    async upload(item_information, item_file) {
        let res = await this.query(`INSERT INTO tbluploads (Post_ID, uploadFileName, uploadFileType) VALUES ('${item_information.post_id}', '${item_file.filename}', '${item_file.mimetype}')`);

        return res;
    }

    async getPosts() {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE isDelete = 0 ORDER BY postDate DESC`);

        return res;
    }

    async getUploadFiles(post_id) {
        let res = await this.query(`SELECT * FROM tbluploads WHERE Post_ID = '${post_id}'`);

        return res;
    }

    async removePost(item_information) {
        let res = await this.query(`UPDATE ${this.table} SET isDelete = 1 WHERE ID = '${item_information.post_id}'`);

        return res;
    }

}

module.exports = MYSQL_POST;