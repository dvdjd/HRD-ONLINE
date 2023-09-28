const MODEL = require("./MODEL")

class MYSQL_LOGIN extends MODEL {

    constructor() {
        super('tblusers')
    }

    async login(pin, password) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE PIN = '${pin}' AND Password = '${password}'`);

        return res;
    }

}

module.exports = MYSQL_LOGIN;