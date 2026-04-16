const Order = require('../models/Order');

// @desc    Create a new food order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  console.log("Received POST /api/orders", req.body);
  try {
    const { items, totalAmount } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order items cannot be empty' });
    }

    if (totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({ error: 'Total amount is required' });
    }

    const newOrder = new Order({
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message, stack: error.stack });
  }
};

// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Public (should be protected in prod)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
