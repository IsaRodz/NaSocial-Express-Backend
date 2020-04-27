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
    const { name, email, password } = req.body;
    const newUser = User({ name, email, password });
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

usersController.login = async (req, res) => {
    let { email, password } = req.body;
    let response = await User.findOne({ email, password });
    if (response) {
        res.json({ response: "valid_user" });
    } else {
        res.json({ response: "invalid_user" });
    }
};

module.exports = usersController;
