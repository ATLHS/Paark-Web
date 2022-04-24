const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dropOffLocation: { type: String },
    dropOffCode: { type: String },
    dropOffTime: { type: String },
    dropBackLocation: { type: String },
    dropBackCode: { type: String },
    status: { type: String, default: "Enregistré" },
    valet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Valet",
    },
    isReturning: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
