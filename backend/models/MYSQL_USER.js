const MODEL = require("./MODEL")

class MYSQL_USER extends MODEL {

    constructor() {
        super('tblusers')
    }

    async login(pin, password) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE PIN = '${pin}' AND Password = '${password}'`);

        return res;
    }

    async getUser(id) {
        let res = await this.query(`SELECT * FROM ${this.table} WHERE ID_No = '${id}'`);

        return res;
    }

    async getBirthday() {
        let res = await this.query(`SELECT LastName, FirstName, Birthday, Department FROM ${this.table} WHERE month(birthday) = month(now()) AND day(birthday) = day(now())`);

        return res;
    }

}

module.exports = MYSQL_USER;