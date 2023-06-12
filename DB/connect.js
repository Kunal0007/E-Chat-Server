const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv.config({ path: "./config.env" });
const DB = "mongodb://127.0.0.1:27017/Echat_DB";

// Middleware
const connectDB = () =>
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((err) => console.log(err));

module.exports = connectDB;
