const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.uri;
const jwtpass = process.env.jwtpass;
const jsonwebtoken = require("jsonwebtoken");

const UserSchema = require("../models/userModel");
const { isEmail } = require("validator");
const userModel = require("../models/userModel");

const validateRequestBodyMiddleware = (req, res, next) => {
  //TODO - melhorar e adicionar validação do resto do usuario
  const { body } = req;
  const errors = [];
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
  if (!isEmail(body.email)) {
    body.email = false;
    errors.push("Email is not valid");
  }

  if (
    !passwordRegex.test(body.password) ||
    !passwordRegex.test(body.confirmpassword)
  ) {
    errors.push("Your password need to have Numbers, Letters and Characters");
  }
  if (body.password !== body.confirmpassword) {
    errors.push("You need to confirm your password");
  }

  if (!body.name || !body.lastname) {
    body.name = false;
    errors.push("User must have a complete name");
  }

  if (body.age < 18) {
    errors.push("User must have at least 18 years old");
  }

  if (errors.length > 0) {
    body.errors = errors;
  }

  next();
};

const signin = async (req, res) => {
  let { body } = req;
  try {
    await mongoose.connect(uri);
    if (body.errors) {
      if (body.errors.length) {
        return res.status(500).send(body.errors);
      }
    }

    const newUser = await new UserSchema({
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      age: body.age,
    });
    await newUser.save();

    console.log(newUser);
    if (newUser) {
      res.status(200).send(true);
    }
  } catch (e) {
    console.log(e);
    if (e.message.indexOf("duplicate key") > 0) {
      return res.status(500).send(["Email already in use"]);
    }
    console.log("sign-in function catched: ", e.message);
    res.status(500).send({ error: e.message });
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

    const passValidator = await userFound.verifyPassword(password);
    //NOTE - falta deixar isto de forma limpa para enviar para o front
    if (passValidator) {
      const response = {
        token: jsonwebtoken.sign(
          {
            userId: userFound._id,
            userEmail: userFound.email,
            userPermissions: userFound.permissions,
          },
          jwtpass,
          { expiresIn: "1h" }
        ),
        userInfo: userFound,
      };
      res.send(response);
    }
  } catch (e) {
    console.log("login catched : ", e.message);
    return res.status(500).send(e.message);
  } finally {
    mongoose.connection.close();
  }
};

const getUser = async (req, res) => {
  const { userEmail } = req.body.decodedtoken;

  try {
    await mongoose.connect(uri);
    const userFound = await UserSchema.find({ email: userEmail });
    if (userFound) {
      res.send(userFound[0]);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  } finally {
    await mongoose.connection.close();
  }
};

const updateUser = async (req, res) => {
  const { currentUser, newUser } = req.body;
  //TODO - criar validação de newUser, antes de fazer o findOne and update
  try {
    await mongoose.connect(uri);

    const user = await UserSchema.findOneAndUpdate(
      { _id: currentUser._id },
      newUser,
      { new: true }
    );

    if (user) {
      res.send(user);
    }
  } catch (e) {
    res.status(500);
    console.log(e);
  } finally {
    mongoose.connection.close();
  }
};

const adminVerification = async (req, res) => {
  const { token } = req.body;
  let object = {};
  try {
    const decodeToken = jsonwebtoken.verify(token, jwtpass);
    console.log(decodeToken);
    if (decodeToken) {
      object.decodedtoken = decodeToken;
      for (let permission of decodeToken.userPermissions) {
        if (permission === "ADMIN") {
          object.bollean = true;
          return res.send(object);
        }
      }
      object.bollean = false;
      return res.send(object);
    }
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e.message);
  }
};

module.exports = {
  signin,
  validateRequestBodyMiddleware,
  login,
  adminVerification,
  getUser,
  updateUser,
};
