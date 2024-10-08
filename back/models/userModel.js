const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
    minlength: 6,
  },
  permissions: { type: Array, default: [] },
  isactive: { type: Boolean, default: true },
  age: {
    type: Number,
    required: [true, "User must have a name"],
    min: [18, "User must have at least 18 years old"],
  },
  resetpasswordtoken: String,
});

UserSchema.methods = {
  verifyPassword: async function (pass) {
    const result = await bcrypt.compare(pass, this.password);

    if (result) {
      return result;
    } else {
      throw new Error("password does not match");
    }
  },
  generateResetPasswordToken: function () {
    this.resetpasswordtoken = Math.round(Math.random() * 100000);
  },
  resetPassword: async function (token, password) {
    const result = await bcrypt.compare(token, this.resetpasswordtoken);
    if (!result) {
      throw new Error("Token does not match");
    }

    this.password = password;
    this.resetpasswordtoken = null;
  },
};
UserSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  if (this.resetpasswordtoken) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.resetpasswordtoken, salt);
    this.resetpasswordtoken = hash;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema, "user");
