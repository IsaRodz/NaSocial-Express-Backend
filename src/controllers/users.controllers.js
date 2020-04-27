const usersController = {};
const User = require("../models/User");

usersController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersController.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

usersController.createUser = async (req, res) => {
    const { name, email } = req.body;
    const newUser = User({ name, email });
    await newUser.save();

    res.json({
        message: "User created successfully",
        user: newUser,
    });
};

usersController.updateUser = async (req, res) => {
    await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ message: "user updated" });
};

usersController.deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "user deleted" });
};

module.exports = usersController;
