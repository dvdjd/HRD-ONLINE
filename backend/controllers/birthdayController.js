const birthdayClass = require("../classes/birthdayClass");

module.exports = {

    async getBirthday(req, res) {
        let birthday_class = new birthdayClass(req.body);

        let birthday = await birthday_class.getBirthday();

        res.send(birthday);
    }
}