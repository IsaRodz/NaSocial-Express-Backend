const { Router } = require("express");
const router = Router();

const verifyToken = require("../helpers/verifyToken");

const {
    getPost,
    getPosts,
    updatePost,
    deletePost,
    createPost,
} = require("../controllers/posts.controller");

router.route("/").get(verifyToken, getPosts).post(createPost);

router
    .route("/:id")
    .get(verifyToken, getPost)
    .put(verifyToken, updatePost)
    .delete(verifyToken, deletePost);

module.exports = router;
