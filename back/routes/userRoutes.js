const express = require("express");

const userRouter = express.Router();
const {
  signin,
  validateRequestBodyMiddleware,
  login,
} = require("../services/userservices");

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

userRouter.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = userRouter;