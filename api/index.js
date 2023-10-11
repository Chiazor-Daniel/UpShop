const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userAuth = require("./routes/auth")
const user = require("./routes/user")
const products = require("./routes/product")
const orders = require("./routes/order")
const cart = require("./routes/cart")
dotenv.config();

mongoose.set('strictQuery', false);

mongoose
  .connect("mongodb+srv://buzz:3uZNfE2Gzy5H169X@cluster0.vapzaqu.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(process.env.PORT || 5000, () => { 
      console.log("Server Running...");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", userAuth);
app.use("/api/user", user)
app.use("/api/products", products)
app.use("/api/cart", cart)
app.use("/api/order", orders)


