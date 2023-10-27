const MYSQL_HR_UPLOADS = require("../models/MYSQL_HR_UPLOADS");

module.exports = class hrUploadClass {
    constructor(item_information, item_file = {}) {
        this.mysql_hr_uploads = new MYSQL_HR_UPLOADS();
        this.item_information = item_information;
        this.item_file = item_file;
    }

    async upload() {
        let res = {};

        try {
            res.data = await this.mysql_hr_uploads.upload(this.item_information, this.item_file);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async getUpload() {
        let res = {};

        try {
            res.data = await this.mysql_hr_uploads.getUpload(this.item_information);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async getUploadItems() {
        let res = {};

        try {
            res.data = await this.mysql_hr_uploads.getUploadItems(this.item_information);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async updateItem() {
        let res = {};

        try {
            res.data = await this.mysql_hr_uploads.updateItem(this.item_information, this.item_file);

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async getByMenu() {
        let res = {};

        try {
            let data = {
                menu: []
            };

            let menu = await this.mysql_hr_uploads.getByMenu(this.item_information);
            let menu_items

            for (let i = 0; i < menu.length; i++) {
                data.menu.push(menu[i]);
                data.menu[i].isOpen = false;
                data.menu[i].files = [];

                menu_items = await this.mysql_hr_uploads.getMenuItems(this.item_information.type, menu[i].uploadMenu);

                for (let j = 0; j < menu_items.length; j++) {
                    data.menu[i].files.push({ file: menu_items[j].uploadName, name: menu_items[j].uploadDisplayName });
                }
            }

            res.data = data

            res.status = "success";
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }
}