const express = require('express');
const router = express.Router();
const Cart_Details = require('../models/cartModel');
const User_Details = require('../models/userModel');
const Product_Details = require('../models/productModel');

// Add a product to the user's cart
router.post('/add', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const user = await User_Details.findByPk(user_id);
    const product = await Product_Details.findByPk(product_id);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    // Add product to cart or update quantity if already exists
    const [cartItem, created] = await Cart_Details.findOrCreate({
      where: { user_id, product_id },
      defaults: { quantity: quantity || 1 }
    });

    if (!created) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    }

    res.status(200).json({ message: 'Product added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
});

// Remove a product from the user's cart
router.post('/remove', async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const result = await Cart_Details.destroy({
      where: { user_id, product_id }
    });

    if (result) {
      res.status(200).json({ message: 'Product removed from cart' });
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
});

// Get all products in the user's cart
router.get('/:user_id', async (req, res) => {
  try {
    const user = await User_Details.findByPk(req.params.user_id, {
      include: {
        model: Product_Details,
        through: { attributes: ['quantity'] }  // Include quantity from Cart_Details
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ cart: user.Product_Details });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

module.exports = router;
