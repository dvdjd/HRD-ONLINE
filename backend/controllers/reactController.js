const reactClass = require("../classes/reactClass");

module.exports = {

    async react(req, res) {
        let react_class = new reactClass(req.body);

        let react = await react_class.react();

        res.send(react);
    },

    async countReact(req, res) {
        let react_class = new reactClass(req.body);

        let count = await react_class.countReact();

        res.send(count);
    },

    async checkReact(req, res) {
        let react_class = new reactClass(req.body);

        let react = await react_class.checkReact();

        res.send(react);
    },

    async getReact(req, res) {
        let react_class = new reactClass(req.body);

        let react = await react_class.getReact();
        res.send(react);
    }
}