const jwt = require('jwt-simple');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;  // Attach user to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticate;
