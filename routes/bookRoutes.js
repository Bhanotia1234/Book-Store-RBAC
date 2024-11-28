const express = require('express');
const { addBook, updateBook, deleteBook, getBooks } = require('../controllers/bookController');
const authenticate = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const router = express.Router();

// Admin: Add a new book
router.post('/', authenticate, checkRole('admin'), addBook);

// Admin: Update an existing book
router.put('/:id', authenticate, checkRole('admin'), updateBook);

// Admin: Delete a book
router.delete('/:id', authenticate, checkRole('admin'), deleteBook);

// User, Moderator, Admin: Get all books
router.get('/', authenticate, getBooks);

module.exports = router;
