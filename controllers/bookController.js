const Book = require('../models/bookModel');

// Admin: Add a new book
exports.addBook = async (req, res) => {
    const { title, author, price, description } = req.body;

    try {
        const newBook = new Book({ title, author, price, description });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ message: 'Error adding book' });
    }
};

// Admin: Update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, price, description } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, description }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book' });
    }
};

// Admin: Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book' });
    }
};

// User & Moderator: Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books' });
    }
};
