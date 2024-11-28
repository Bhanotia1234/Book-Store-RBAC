const express = require('express');
const { placeOrder, approveOrder } = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const router = express.Router();

// User: Place an order
router.post('/', authenticate, placeOrder);

// Moderator: Approve or reject an order
router.put('/:id', authenticate, checkRole('moderator'), approveOrder);

module.exports = router;
