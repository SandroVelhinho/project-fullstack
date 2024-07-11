const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors())
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(3001, () => {
  console.log("app running");
});
