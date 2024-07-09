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
    const result = jwt.verify(body.token, jwtpass);
    console.log(result);
    let permissions;
    for (let i = 0; i < result.userPermissions.length; i++) {
      if ((result.userPermissions[i] = "ADMIN")) {
        return (permissions = true);
      }
    }
    if (!permissions) {
      res.status(404).send("not an admin");
    }
    const newProduct = new productSchema(body.newproduct);
    await newProduct.save();
    if (newProduct) {
      res.status(200).send(true);
    } else {
      res.status(404).send(false);
    }
  } catch (e) {
    console.log("AddnewProduct catched: ", e);
    res.status(404).send(e.message);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { AddNewProduct, getProducts };
