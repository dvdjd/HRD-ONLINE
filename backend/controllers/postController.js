const postClass = require("../classes/postClass");
const { upload } = require("./../multer");

module.exports = {
    async post(req, res) {
        // upload(req, res, async (err) => {
        //     let post_class = new postClass(req.body, req.files);

        //     let post = await post_class.post();
        //     res.send(post);

        // });
        let post_class = new postClass(req.body);

        let post = await post_class.getPostID();
        res.send(post);
    },

    async getPosts(req, res) {
        let post_class = new postClass(req.body);

        let post = await post_class.getPosts();

        res.send(post);
    },

    async removePost(req, res) {
        let post_class = new postClass(req.body);

        let remove = await post_class.removePost();

        res.send(remove);
    }

}