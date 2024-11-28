const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
