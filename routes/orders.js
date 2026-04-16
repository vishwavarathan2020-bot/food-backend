const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

// POST /api/orders
// Create a new food order
router.post('/', createOrder);

// GET /api/orders
// Fetch all orders
router.get('/', getOrders);

module.exports = router;
