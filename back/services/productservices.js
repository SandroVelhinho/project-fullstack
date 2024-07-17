const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtpass = process.env.jwtpass;
const uri = process.env.uri;

const productSchema = require("../models/productModel");

const getProducts = async (req, res) => {
  const { category } = req.body;
  try {
    await mongoose.connect(uri);
    // se naõ houver categoria retorna objeto vazio
    const query = {
      ...(category && { category }),
    };
    console.log(query);

    res.status(200).send(await productSchema.find(query));
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
};

const removeProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    await productSchema.findByIdAndDelete(productId, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send("Deleted User : ", docs);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const AddNewProduct = async (req, res) => {
  const { body } = req;
  try {
    await mongoose.connect(uri);
    //NOTE - voltar para verificar o response do api
    const result = jwt.verify(body.token, jwtpass);
    console.log(result);
    let permissions = false;

    for (let i = 0; i < result.userPermissions.length; i++) {
      if (result.userPermissions[i] === "ADMIN") {
        permissions = true;
      }
    }

    if (!permissions) {
      res.status(500).send("not an admin");
    }
    const newProduct = await new productSchema(body.newproduct);
    await newProduct.save();
    console.log(newProduct);
    if (newProduct) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  } catch (e) {
    console.log("AddnewProduct catched: ", e);
    res.status(500).send(e.message);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { AddNewProduct, getProducts, removeProduct };
