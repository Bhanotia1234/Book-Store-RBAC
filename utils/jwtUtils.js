const jwt = require('jwt-simple');
const dotenv = require('dotenv');

dotenv.config();

// Function to generate JWT token
const generateToken = (user) => {
    const payload = {
        id: user._id, // Add the user ID (or any other relevant data)
        role: user.role, // Add the role (admin, user, moderator)
        username: user.username,
    };

    const token = jwt.encode(payload, process.env.JWT_SECRET, 'HS256'); // Encode the payload using the secret key
    return token;
};

// Function to decode/verify JWT token
const decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET); // Decode the token using the same secret key
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
};

// Function to verify if the token is valid
const verifyToken = (token) => {
    try {
        const decoded = decodeToken(token); // If decodeToken is successful, token is valid
        return decoded;
    } catch (err) {
        throw new Error('Unauthorized');
    }
};

module.exports = { generateToken, decodeToken, verifyToken };
