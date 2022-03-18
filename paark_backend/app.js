require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// db config
const url = process.env.ATLAS_URL;
mongoose
  .connect(process.env.ATLAS_URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.get("/a", (req, res) => {
  res.json({ user: "toby" });
});

const user = require("./routes/api/user");
const payment = require("./routes/api/payment");
const adminAuth = require("./routes/api/auth_admin");
const ride = require("./routes/api/ride");

app.use("/api/user/", user);
app.use("/api/payment/", payment);
app.use("/api/admin/", adminAuth);
app.use("/api/ride/", ride);

app.listen(port, () => console.log(`Server listening on port ${port}`));
