const MYSQL_REACTIONS = require("../models/MYSQL_REACTIONS")

module.exports = class reactClass {
    constructor(item_information) {
        this.mysql_reactions = new MYSQL_REACTIONS();
        this.item_information = item_information;
    }

    async react() {
        let res = {};

        try {
            let react_exist = await this.mysql_reactions.checkReact(this.item_information);

            if (react_exist.length > 0) {
                if (this.item_information.mode == 1) {
                    res.data = await this.mysql_reactions.updateReact(this.item_information);
                } else if (this.item_information.mode == 2) {
                    res.data = await this.mysql_reactions.removeReact(this.item_information);
                }
            } else {
                res.data = await this.mysql_reactions.addReact(this.item_information);
            }

            res.status = "success";

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async countReact() {
        let res = {};

        try {
            res.data = await this.mysql_reactions.countReact(this.item_information);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async checkReact() {
        let res = {};

        try {
            res.data = await this.mysql_reactions.checkReact(this.item_information);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;

    }

    async getReact() {
        let res = {};

        try {
            res.data = await this.mysql_reactions.getReact(this.item_information);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

}