const loginClass = require("../classes/loginClass");

module.exports = {
    async login(req, res) {
        let login_class = new loginClass(req.body);

        let get_users = await login_class.login();

        res.send(get_users);
    }
}