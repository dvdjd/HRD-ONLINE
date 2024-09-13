const MYSQL_USER = require("../models/MYSQL_USER")
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class loginClass {
    constructor(item_information) {
        this.mysql_user = new MYSQL_USER();
        this.item_information = item_information;
    }

    createToken = (id) => {
        const jwtKey = "bulanglangNaPatani"
        return jwt.sign({id}, jwtKey, {expiresIn: "3d"})
    }

    async login() {
        let res = {};

        try {
            res.data = await this.mysql_user.login(this.item_information.pin, this.item_information.password);

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

    async getUser() {
        let res = {};

        try {
            res.data = await this.mysql_user.getUser(this.item_information.id);

            if (res.data.length == 0) {
                res.status = "error";
                res.message = "No User Found!";
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