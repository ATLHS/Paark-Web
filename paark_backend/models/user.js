const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    phone: { type: String, unique: true },
    isConfirmed: { type: Boolean, default: false },
    confirmedCode: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
