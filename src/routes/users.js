const { Router } = require("express");
const router = Router();

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
} = require("../controllers/users.controllers");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router.route("/login").post(login);

module.exports = router;
