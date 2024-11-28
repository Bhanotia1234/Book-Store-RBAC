const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();

        const token = jwt.encode({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user and issue JWT token
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.encode({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
