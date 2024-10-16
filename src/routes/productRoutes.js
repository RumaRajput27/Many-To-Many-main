const express = require('express');
const router = express.Router();
const Product_Details = require('../models/productModel');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, ispurchased } = req.body;
    const newProduct = await Product_Details.create({ product_name, price, ispurchased });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product_Details.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get a single product by ID
router.get('/:product_id', async (req, res) => {
  try {
    const product = await Product_Details.findByPk(req.params.product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

module.exports = router;
