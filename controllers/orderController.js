const Order = require('../models/orderModel');

// User: Place an order
exports.placeOrder = async (req, res) => {
    const { bookId } = req.body;

    try {
        const order = new Order({
            userId: req.user._id,
            bookId,
            status: 'pending',
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error placing order' });
    }
};

// Moderator: Approve or reject an order
exports.approveOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;  // "approved" or "rejected"

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (status === 'approved' || status === 'rejected') {
            order.status = status;
            await order.save();
            res.json(order);
        } else {
            res.status(400).json({ message: 'Invalid status' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error approving/rejecting order' });
    }
};
