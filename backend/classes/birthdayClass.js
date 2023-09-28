const MYSQL_BIRTHDAY = require("../models/MYSQL_BIRTHDAY")

module.exports = class loginClass {
    constructor(item_information) {
        this.mysql_birthday = new MYSQL_BIRTHDAY();
        this.item_information = item_information;
    }

    async getBirthday() {
        let res = {};

        try {
            res.data = await this.mysql_birthday.getBirthday();

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