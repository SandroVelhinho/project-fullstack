const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.uri;
const jwtpass = process.env.jwtpass;
const jsonwebtoken = require("jsonwebtoken");
const { sendForgotPasswordEmail } = require("./nodemailer");
const UserSchema = require("../models/userModel");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await mongoose.connect(uri);

    const user = await UserSchema.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    await user.generateResetPasswordToken();

    await sendForgotPasswordEmail(user);
    await user.save();
    res.send("Check your mail");
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
};

const resetPassword = async (req, res) => {
  const { email, token, oldpassword, newpassword } = req.body;
  try {
    await mongoose.connect(uri);

    const user = await UserSchema.findOne({ email: email });
    const passValidator = await user.verifyPassword(oldpassword);
    if (!passValidator) {
      return res.send("incorrect password");
    }
    if (!user.resetpasswordtoken) {
      throw new Error("No reset password token");
    }
    await user.resetPassword(token, newpassword);
    await user.save();
    res.send("PassWord atualized");
  } catch (e) {
    console.log(e);
    res.send(e.message);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = { forgotPassword, resetPassword };
