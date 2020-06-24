const path = require('path');

const express = require('express');

const productsController = require('../controllers/products')

const router = express.Router();

// get and post can be only exact paths
router.get('/', productsController.getProducts);

module.exports = router;