const express = require("express");

const app = express();
const { signin } = require("./services/userthings");
app.use(express.json());

app.post("/signin", async (req, res) => {
  try {
    await signin(req, res);
  } catch (e) {
    console.log("error posting : ", e);
  }
});

app.listen(3000, () => {
  console.log("app running");
});
