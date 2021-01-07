const path = require("path");

const express = require("express");
const {check} = require('express-validator');

const router = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require('../middleware/is-auth');

router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

router.post("/add-product",[
    check('title', "Plese enter a valid title.").isString().isLength({min: 3}).trim(),
    check('price',"Plese enter a valid Price.").isFloat(),
    check('description',"Plese enter a valid Description.").isLength({min: 5, max: 400}).trim(),
], isAuth, adminController.postAddProduct);

router.get("/edit-product/:id", isAuth, adminController.getEditProduct);

router.post("/edit-product",[
    check('title', "Plese enter a valid title.").isString().isLength({min: 3}).trim(),
    check('price',"Plese enter a valid Price.").isFloat(),
    check('description',"Plese enter a valid Description.").isLength({min: 5, max: 400}).trim(),
], isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
