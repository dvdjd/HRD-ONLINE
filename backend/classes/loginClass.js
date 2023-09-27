const MYSQL_LOGIN = require("../models/MYSQL_LOGIN")

module.exports = class loginClass {
    constructor(item_information) {
        this.mysql_login = new MYSQL_LOGIN();
        this.item_information = item_information;
    }

    async login() {
        let res = {};

        try {
            res.data = await this.mysql_login.login(this.item_information.pin, this.item_information.password);

            if (res.data.length == 0) {
                res.status = "error";
                res.message = "Invalid Credentials";
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