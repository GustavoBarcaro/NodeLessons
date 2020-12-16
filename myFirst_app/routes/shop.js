const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

const isAuth = require('../middleware/is-auth');
// get and post can be only exact paths
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:id", shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postDeleteProductInCart);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);


module.exports = router;
 