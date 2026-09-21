const User = require("../models/userModel");

const getUsers = async (req, res) => {
    const users = await User.find();
    if (users.length === 0)
        return res.status(404).json({ error: "Users not found." });
    res.json(users);
};

const getUserByName = async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user)
};

const getRecentUsers = async (req, res) => {
    const users = await User.find().
        sort({ createdAt: -1 }).
        limit(10);
    if (users.length === 0)
        return res.status(404).json({ error: "Users not found." });
    res.json(users);
};

const createUser = async (req, res) => {
    const {
        email,
        username,
        password,
        bio,
    } = req.body;

    if (!email || !username || !password)
        return res.status(400).json({ error: "Invalid request" });

    const user = new User({
        email: email,
        username: username,
        password: password,
        bio: bio,
    })
    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getUsers,
    getUserByName,
    getRecentUsers,
    createUser
}; 