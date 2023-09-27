const MODEL = require("./MODEL")

class MYSQL_BIRTHDAY extends MODEL {

    constructor() {
        super('tblusers')
    }

    async getBirthday() {
        let res = await this.query(`SELECT LastName, FirstName, Birthday, Department FROM ${this.table} WHERE month(birthday) = month(now()) ORDER BY day(Birthday) ASC`);

        return res;
    }

}

module.exports = MYSQL_BIRTHDAY;