const sql = require("../mssql_config");
const mysql = require("../mysql_config");

module.exports = class Model {
    constructor(table) {
        this.table = table;
        this.sql = sql.request
        this.query = mysql.request
    }

}