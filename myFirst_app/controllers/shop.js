const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price imageUrl _id')
    // .populate('userId', 'name')
    .then((response) => {
      res.render("shop/product-list", {
        prods: response,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.id;
  Product.findById(prodID)
    .then((response) => {
      res.render("shop/product-detail", {
        product: response,
        path: "/products",
        pageTitle: response.title,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((response) => {
      res.render("shop/index", {
        prods: response,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// // cart

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId)
    .then((response) => {
      return req.user.addToCart(response);
    })
    .then((response) => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProductInCart = (req, res, next) => {
  const prodId = req.body.id;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
    });
};

//orders

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const items = user.cart.items.map((i) => {
        return { quantity: i.quantity, item: {...i.productId._doc} };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        items: items,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
      
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({"userId": req.user._user})
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
