const commentClass = require("../classes/commentClass");

module.exports = {
    async comment(req, res) {
        let comment_class = new commentClass(req.body);

        let comment = await comment_class.comment();

        res.send(comment);
    },

    async getComments(req, res) {
        let comment_class = new commentClass(req.body);

        let comments = await comment_class.getComments();

        res.send(comments);
    }
}