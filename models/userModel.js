const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define roles for the users (Admin, Moderator, User)
const roles = ['admin', 'moderator', 'user'];

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: roles, default: 'user' }, // Default role is user
});

// Method to check if the entered password is valid
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
