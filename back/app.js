const express = require("express");

const app = express();
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(3000, () => {
  console.log("app running");
});
