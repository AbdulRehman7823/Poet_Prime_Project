const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const { verifyToken } = require("../../middlewares/authenticate");

//cart

router.post("/cart/:id", verifyToken, async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("Add This Product in cart/" + req.params.id);
  let tempP = {
    _id: product._id,
    title: product.title,
    quantity: product.quantity,
    userId: req.body.userId,
    price: product.price,
    description: product.description,
  };
  tempP.userId = req.body.userId;

  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  if (
    !cart.some((item) => item._id == tempP._id && item.userId == tempP.userId)
  ) {
    cart.push(tempP);
    res.cookie("cart", cart, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.send(cart);
  } else res.status(422).send({ message: "This item already added to cart" });
});

router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart, {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  res.send(cart);
});
router.get("/cart", async function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  console.log({ cart });
  res.send({ cart });
});

router.get("/", async (req, res) => {
  try {
    let product = await Product.find();
    if (product.length > 0) {
      res.status(200).send(product);
    } else {
      res.status(200).send({ message: "There is no product" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send({ message: "There is no product with this id." });
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).send(updatedProduct);
    } else {
      res.status(400).send({ message: "There is no product with this id." });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).send({ message: "This product is not available" });
    }
    return res.send(product);
  } catch (err) {
    return res.status(404).send({ message: "Id is not a valid" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let product = new Product(req.body);
    await product.save();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(422).send({ message: "This product is invalid" });
  }
});

module.exports = router;
