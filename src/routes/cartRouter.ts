import express from "express";
import { cartItems } from "../db";
import Product from "../models/Product";

const cartRouter = express.Router();

let nextId = cartItems.length;

// GET
cartRouter.get("/", (req, res) => {
  const { maxPrice, prefix, pageSize } = req.query;

  let filteredProducts = cartItems;

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((obj) => {
      return obj.price <= +maxPrice;
    });
  }

  if (prefix) {
    filteredProducts = filteredProducts.filter((item) => {
      return item.product.startsWith(prefix);
    });
  }
  if (pageSize) {
    filteredProducts = filteredProducts.slice(0, +pageSize);
  }

  res.status(200).json(filteredProducts);
});

cartRouter.get("/:zebra", (req, res) => {
  const idFromRequest: number = +req.params.zebra;

  const someProduct: Product | undefined = cartItems.find((obj) => {
    return obj.id === idFromRequest;
  });
  if (someProduct) {
    res.status(200);
    res.json(someProduct);
  } else {
    res.status(404);
    res.json({ message: `Cannot find a product with ID: ${idFromRequest}` });
  }
});

cartRouter.post("/", (req, res) => {
  const newItem: Product = req.body;
  newItem.id = ++nextId;
  cartItems.push(newItem);
  res.status(201).json(newItem);
});

cartRouter.put("/:id", (req, res) => {
  const idToReplace: number = +req.params.id;
  const updateProduct: Product = req.body;

  const idx: number = cartItems.findIndex((obj) => {
    return obj.id === idToReplace;
  });

  if (idx !== -1) {
    cartItems[idx] = updateProduct;
    res.status(200).json(updateProduct);
  } else {
    res
      .status(404)
      .json({ message: `No product found with ID: ${idToReplace}` });
  }
});

cartRouter.delete("/:id", (req, res) => {
  const idToDelete: number = +req.params.id;

  const i = cartItems.findIndex((obj) => {
    return (obj.id = idToDelete);
  });

  if (i !== -1) {
    cartItems.splice(i, 1);
    res.sendStatus(204);
  } else {
    res
      .status(404)
      .json({ message: `No product found with ID: ${idToDelete}` });
  }
});

export default cartRouter;
