const express = require("express");
const app = express();
var cors = require("cors");

const productRoutes = require("./routes/productRoutes");

require("dotenv").config();

//Conexión base de datos
const mongoose = require("mongoose");
const URI = process.env.MONGODB_CONNECT;

//metodo conexión
try {
  mongoose.connect(URI).then(() => {
    console.log("Base de datos conectada!!!");
  });
} catch (error) {
  console.log("El error es: " + error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/products", productRoutes);
module.exports = app;
