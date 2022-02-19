const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    phone: { type: String },
    isConfirmed: { type: Boolean, default: false },
    registeredConfirmedCode: { type: Number, default: 0 },
    getCarConfirmedCode: { type: Number, default: 0 },
    rides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
      },
    ],
    stripeCustomerId: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
