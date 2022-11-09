const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const connection = mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then(() => {
    console.log("Connection Succcessful!");
  })
  .catch((e) => {
    console.log("error", e);
  });
module.exports = connection;
