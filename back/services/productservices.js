const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtpass = process.env.jwtpass;
const uri = process.env.uri;

const productSchema = require("../models/productModel");

const getProducts = async (req, res) => {
  console.log("api chamada");
  const { category } = req.body;
  try {
    await mongoose.connect(uri);
    // se naõ houver categoria retorna objeto vazio
    const query = {
      ...(category && { category }),
    };
    console.log(query);

    const productList = await productSchema.find(query);
    console.log(productList);
    res.status(200).send(productList);
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
};
const getAProduct = async (req, res) => {
  const { id } = req.body;
  try {
    await mongoose.connect(uri);

    const productFound = await productSchema.find({ _id: id });
    if (productFound) {
      res.send(productFound[0]);
    }
  } catch (e) {
    res.status(500).send("product not found");
  } finally {
    await mongoose.connection.close();
  }
};

const removeProduct = async (req, res) => {
  const { prodID } = req.body;
  console.log("prodID : ", prodID);

  try {
    await mongoose.connect(uri);
    const deletion = await productSchema.findByIdAndDelete(prodID);
    if (deletion) {
      res.send({
        message: `Product ${deletion.name} with id: ${deletion._id}, was removed `,
        bollean: true,
      });
    } else {
      res.status(500).send({ message: "something went wrong", bollean: false });
    }
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

module.exports = { getAProduct, AddNewProduct, getProducts, removeProduct };
