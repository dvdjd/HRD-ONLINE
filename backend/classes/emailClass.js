let email = require("../emailConfig");

module.exports = class emailClass {
    constructor(item_information) {
        this.item_information = item_information;
    }

    async sendMail() {
        let res = {};

        try {
            res.status = "success"

            let send_mail = await email.sendMail({
                from: '"HRD-Online" <admin-system@nmc-net.com>',
                to: ['dacula@nmc-net.com', 'jerato@nmc-net.com'],
                subject: `People Concern`,
                text: this.item_information.content
            })

        } catch (error) {
            res.status = "error"
            res.message = error.message
        }
        return res;
    }

}