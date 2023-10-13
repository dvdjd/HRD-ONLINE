const MODEL = require("./MODEL")

class MYSQL_REACTIONS extends MODEL {

    constructor() {
        super('tblreactions')
    }

    async addReact(item_information) {
        let res = await this.query(`INSERT INTO ${this.table} (Post_ID, reactUserID, reactType, reactDateTime) VALUES ('${item_information.post_id}', '${item_information.user_id}', '${item_information.react_type}', NOW())`);

        return res;
    }

    async updateReact(item_information) {
        let res = await this.query(`UPDATE ${this.table} SET reactType = '${item_information.react_type}', reactDateTime = NOW() WHERE Post_ID = '${item_information.post_id}' AND reactUserID = '${item_information.user_id}'`);

        return res;
    }

    async removeReact(item_information) {
        let res = await this.query(`DELETE FROM ${this.table} WHERE Post_ID = '${item_information.post_id}' AND reactUserID = '${item_information.user_id}'`);

        return res;
    }

    async checkReact(item_information) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE Post_ID = '${item_information.post_id}' AND reactUserID = '${item_information.user_id}'`);

        return res;
    }

    async countReact(item_information) {
        let res = await this.query(`SELECT COUNT(*) AS count, reactType FROM ${this.table} WHERE Post_ID = '${item_information.post_id}' GROUP BY reactType ORDER BY COUNT(*) DESC`);

        return res;
    }

    async getReact(item_information) {
        let res = await this.query(`SELECT a.ID, a.Post_ID, a.reactUserID, a.reactType, a.reactDateTime, b.LastName, b.FirstName, b.Department FROM ${this.table} a INNER JOIN tblusers b ON a.reactUserID = b.ID_No WHERE Post_ID = '${item_information.post_id}'`);

        return res;
    }

}

module.exports = MYSQL_REACTIONS;