const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.uri;

const productSchema = require("../models/productModel");

const getProducts = async (req, res) => {
  const { category } = req.body;
  try {
    await mongoose.connect(uri);

    const query = {
      ...(category && { category }),
    };

    res.status(200).send(await productSchema.find(query));
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
};

const AddNewProduct = async (req, res) => {
  const { body } = req;
  try {
    await mongoose.connect(uri);
    //NOTE - voltar para verificar o response do api
    const newProduct = new productSchema(body);
    if (newProduct) {
      res.status(200).send(true);
    } else {
      res.status(404).send(false);
    }
  } catch (e) {
    console.log("AddnewProduct catched: ", e);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { AddNewProduct, getProducts };
