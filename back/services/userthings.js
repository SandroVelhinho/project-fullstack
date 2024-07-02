const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.uri;

const UserSchema = require("../models/userModel");

const signin = async (req, res) => {
  let { body } = req;
  try {
    await mongoose.connect(uri);

    const newUser = new UserSchema(body);
    await newUser.save();
    console.log(newUser);
    res.send(newUser);
  } catch (e) {
    console.log("singin function catched: ", e);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { signin };
