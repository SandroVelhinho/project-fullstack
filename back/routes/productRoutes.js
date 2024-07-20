const express = require("express");

const productRouter = express.Router();

const {
  AddNewProduct,
  getProducts,
  removeProduct,
  getAProduct,
} = require("../services/productservices");

productRouter.post("/", async (req, res) => {
  await AddNewProduct(req, res).catch((e) => console.log(e));
});

productRouter.post("/add", async (req, res) => {
  await AddNewProduct(req, res).catch((e) => console.log("e"));
});

productRouter.post("/getaproduct", async (req, res) => {
  await getAProduct(req, res).catch((e) => console.log(e));
});

productRouter.post("/delete", async (req, res) => {
  await removeProduct(req, res).catch((e) => console.log(e));
});

productRouter.post("/get", async (req, res) => {
  await getProducts(req, res).catch((e) => console.log(e));
  res.end();
});

module.exports = productRouter;
