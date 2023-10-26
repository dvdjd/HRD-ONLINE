const MODEL = require("./MODEL")

class MYSQL_HR_UPLOADS extends MODEL {

    constructor() {
        super('tblhruploads')
    }

    async upload(item_information, item_file) {
        let res = await this.query(`INSERT INTO ${this.table} (uploadName, uploadType, uploadDateTime, uploadDisplayName, isDelete) VALUES ('${item_file.filename}', '${item_information.type}', NOW(), '${item_information.display_name}', 0)`);

        return res;
    }

    async getUpload(item_information) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE uploadType = '${item_information.type}' ORDER BY ID DESC LIMIT 1`);

        return res;
    }

    async getUploadItems(item_information) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE uploadType = '${item_information.type}' AND isDelete != 1 ORDER BY ID DESC`);

        return res;
    }

    async updateItem(item_information, item_file) {
        let res = await this.query(`UPDATE ${this.table} SET uploadName = '${item_file.filename}', uploadDisplayName = '${item_information.display_name}' WHERE ID = '${item_information.id}'`);

        return res;
    }

    async removeItem(item_information) {
        let res = await this.query(`UPDATE ${this.table} SET isDelete = 1 WHERE ID = '${item_information.id}'`);

        return res;
    }

    async getByMenu(item_information) {
        let res = await this.query(`SELECT uploadMenu FROM ${this.table} WHERE uploadType = '${item_information.type}' AND isDelete != 1 AND uploadMenu != 'NULL' GROUP BY uploadMenu`);

        return res;
    }

    async getMenuItems(type, menu) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE uploadType = '${type}' AND uploadMenu = '${menu}' AND isDelete != 1 ORDER BY ID DESC`);

        return res;
    }

}

module.exports = MYSQL_HR_UPLOADS;