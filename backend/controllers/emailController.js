const emailClass = require("../classes/emailClass");

module.exports = {

    async sendMail(req, res) {
        let email_class = new emailClass(req.body);

        let react = await email_class.sendMail();

        res.send(react);
    },
}