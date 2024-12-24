const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const redisCache = require('../cache/redis');
const auth = require('../middlewares/auth');

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id); // Find product by ID
      if (!product) return res.status(404).send('Product not found');
      res.status(200).json(product);
    } catch (err) {
      console.error('Error fetching product:', err);
      res.status(500).send('Server Error');
    }
  });

// Get all products (secured with Basic Authentication)
router.get('/', auth, async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.status(200).json(products); // Send the products as a JSON response
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Server Error'); // Handle server errors
    }
  });
  

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body); // Create a new product
    await product.save(); // Save to database
    res.status(201).json(product); // Return the created product
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).send('Server Error');
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send('Product not found');
    res.status(200).json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Server Error');
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
