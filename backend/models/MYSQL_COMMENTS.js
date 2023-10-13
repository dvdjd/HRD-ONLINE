const MODEL = require("./MODEL");

class MYSQL_COMMENTS extends MODEL {

    constructor() {
        super('tblcomments');
    }

    async comment(item_information) {
        let res = await this.query(`INSERT INTO ${this.table} (Post_ID, commentUserID, comment, commentDateTime) VALUES ('${item_information.post_id}', '${item_information.user_id}', '${item_information.comment}', NOW())`);

        return res;
    }

    async getComments(item_information) {
        let res = await this.query(`SELECT a.ID, a.Post_ID, a.commentUserID, a.comment, a.commentDateTime, b.FirstName, b.LastName, b.Department FROM dbhrdonline.tblcomments a INNER JOIN dbhrdonline.tblusers b ON a.commentUserID = b.ID_No WHERE a.Post_ID = '${item_information.post_id}'`);

        return res;
    }
}

module.exports = MYSQL_COMMENTS;