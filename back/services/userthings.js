const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.uri;

const UserSchema = require("../models/userModel");
const { isEmail } = require("validator");

const signin = async (req, res) => {
  let { body } = req;
  try {
    await mongoose.connect(uri);
    const newUser = new UserSchema(body);
    await newUser.save();

    console.log(newUser);
    if (newUser) {
      res.status(200).send(true);
    }
  } catch (e) {
    console.log("singin function catched: ", e);
    let objeto = bodyErrorIdentify(body);
    res.status(405).send(objeto);
  } finally {
    mongoose.connection.close();
  }
};
//TODO - funcção de login com token jwt

const bodyErrorIdentify = (body) => {
  if (isEmail(body.email) === false) {
    body.email = false;
  }
  //FIXME - error andler de password dont work
  if (body.password.lenght < 6) {
    body.password = false;
  }
  return body;
};

module.exports = { signin };
