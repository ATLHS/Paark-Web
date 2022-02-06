const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, unique: true },
    phone: { type: String, unique: true },
    isConfirmed: { type: Boolean, unique: true, default: false },
    confirmedCode: { type: Number, unique: true, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
