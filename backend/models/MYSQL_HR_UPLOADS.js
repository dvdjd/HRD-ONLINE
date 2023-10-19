const MODEL = require("./MODEL")

class MYSQL_HR_UPLOADS extends MODEL {

    constructor() {
        super('tblhruploads')
    }

    async upload(item_information, item_file) {
        let res = await this.query(`INSERT INTO ${this.table} (uploadName, uploadType, uploadDateTime) VALUES ('${item_file.filename}', '${item_information.type}', NOW())`);

        return res;
    }

    async getUpload(item_information) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE uploadType = '${item_information.type}' ORDER BY ID DESC LIMIT 1`);

        return res;
    }

}

module.exports = MYSQL_HR_UPLOADS;