const express = require("express");

const productRouter = express.Router();

const { AddNewProduct, getProducts } = require("../services/productservices");

productRouter.post("/", async (req, res) => {
  await AddNewProduct(req, res).catch((e) => console.log(e));
});
productRouter.post("/get", async (req, res) => {
  await getProducts(req, res).catch((e) => console.log(e));
  res.end();
});

module.exports = productRouter;
