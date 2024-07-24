const express = require("express");

const userRouter = express.Router();
const {
  signin,
  validateRequestBodyMiddleware,
  login,
  adminVerification,
  getUser,
  updateUser,
} = require("../services/userservices");
const {
  forgotPassword,
  resetPassword,
} = require("../services/forgotcredencials_service");

userRouter.post(
  "/signin",
  (req, res, next) => {
    try {
      validateRequestBodyMiddleware(req, res, next);
    } catch (error) {
      return res.status(400).send({
        error: error.message.split(","),
      });
    }
  },
  async (req, res) => {
    try {
      await signin(req, res);
    } catch (e) {
      console.log("error posting : ", e);
    }
  }
);
userRouter.post("/forgotpassword", async (req, res) => {
  await forgotPassword(req, res).catch((e) => console.log(e));
});
userRouter.post("/resetpassword", async (req, res) => {
  await resetPassword(req, res).catch((e) => console.log(e));
});

userRouter.post("/update", async (req, res) => {
  await updateUser(req, res).catch((e) => console.log(e));
});

userRouter.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (e) {
    console.log(e.message);
  }
});

userRouter.post("/getuserinfo", async (req, res) => {
  await getUser(req, res).catch((e) => console.log(e));
});

userRouter.post("/isadmin", async (req, res) => {
  try {
    await adminVerification(req, res);
  } catch (e) {
    console.log("isadmin catched: ", e);
  }
});

module.exports = userRouter;
