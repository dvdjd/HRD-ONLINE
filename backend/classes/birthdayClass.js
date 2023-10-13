const MYSQL_USER = require("../models/MYSQL_USER")

module.exports = class loginClass {
    constructor(item_information) {
        this.mysql_user = new MYSQL_USER();
        this.item_information = item_information;
    }

    async getBirthday() {
        let res = {};

        try {
            res.data = await this.mysql_user.getBirthday();

            if (res.data.length == 0) {
                res.status = "error";
                res.message = "No Birthdays for this Month.";
            } else {
                res.status = "success";
            }

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

}