require("dotenv").config();
const usersController = {};
const User = require("../models/User");
const jwt = require("jsonwebtoken");

usersController.getUsers = async (req, res) => {
    let users = await User.find();
    res.json(users);
};

usersController.getUser = async (req, res) => {
    let user = await User.findById(req.params.id);
    res.json(user);
};

usersController.createUser = async (req, res) => {
    let { name, email, password } = req.body;
    let user = User({ name, email, password });
    user.password = await user.encryptPassword(user.password);

    let token = jwt.sign({ id: user._id }, process.env.SECRET);

    await user.save();

    res.json({
        message: "User created successfully",
        token,
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
    let user = await User.findOne({ email });

    if (!user) return res.json({ auth: false, token: null });

    let validPassword = await user.validatePassword(password);

    if (!validPassword) return res.json({ auth: false, token: null });

    let token = jwt.sign({ id: user._id }, process.env.SECRET);

    return res.json({ auth: true, token, user: user.name });
};

module.exports = usersController;
