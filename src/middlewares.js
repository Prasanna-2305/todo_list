const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");

const registeredUser = require("./models/userSchema");

const app = express();
app.use(express.json());

exports.auth = async (req, res, next) => {
  await registeredUser
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user === "") {
        res.status(400).send("email didn't exist");
      } else {
        bcrypt.compare(req.body.password, user.password, (er, response) => {
          if (response) {
            next();
          } else {
            res.status(400).send(" Incorrect Password ");
          }
        });
      }
    })
    .catch((e) => {
      res.status(404).send(e);
    });
};

exports.tokenAuth = async (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    res.send("Session Expired!");
    res.status(401);
  }  
};
