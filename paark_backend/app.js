require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.send("Welcome to Express");
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
