const postsController = {};
const Posts = require("../models/Post");

postsController.getPosts = async (req, res) => {
    const posts = await Posts.find();
    res.json(posts);
};

postsController.getPost = async (req, res) => {
    const post = await Posts.findById(req.params.id);
    res.json(post);
};

postsController.createPost = async (req, res) => {
    const { content, author } = req.body;
    const newPost = Posts({ content, author });
    await newPost.save();

    res.json({
        message: "Post created successfully",
        post: newPost,
    });
};

postsController.updatePost = async (req, res) => {
    const post = await Posts.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ message: "Post updated", post });
};

postsController.deletePost = async (req, res) => {
    await Posts.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
};

module.exports = postsController;
