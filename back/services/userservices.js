const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.uri;
const jwtpass = process.env.jwtpass;
const jsonwebtoken = require("jsonwebtoken");

const UserSchema = require("../models/userModel");
const { isEmail } = require("validator");

const validateRequestBodyMiddleware = (req, res, next) => {
  //TODO - melhorar e adicionar validação do resto do usuario
  const { body } = req;
  const errors = [];
  if (!isEmail(body.email)) {
    body.email = false;
    errors.push("Email is not valid");
  }

  if (body.password.length < 6) {
    body.password = false;
    errors.push("Password is not valid");
  }

  if (errors.length > 0) {
    throw new Error(errors);
  }

  next();
};

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
    console.log("sign-in function catched: ", e);
    res.status(400).send({ error: e.message, body: body });
  } finally {
    mongoose.connection.close();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await mongoose.connect(uri);

    const userFound = await UserSchema.findOne({ email: email });

    if (!userFound) {
      res.status(400).send("user not found");
    }

    const a = await userFound.verifyPassword(password);
    //NOTE - falta deixar isto de forma limpa para enviar para o front
    if (a) {
      res.send(
        jsonwebtoken.sign(
          {
            userId: userFound._id,
            userEmail: userFound.email,
            userPermissions: userFound.permissions,
          },
          jwtpass,
          { expiresIn: "1h" }
        )
      );
    }
  } catch (e) {
    console.log("login catched : ", e);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { signin, validateRequestBodyMiddleware, login };
