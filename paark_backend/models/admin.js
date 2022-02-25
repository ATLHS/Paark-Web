const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

const adminSchema = new mongoose.Schema(
  {
    email: { type: String },
    emailConfirmed: { type: Boolean, default: false },
    accountConfirmed: { type: Boolean, default: false },
    registeredConfirmedCode: { type: Number, default: 0 },
    password: { type: String },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

