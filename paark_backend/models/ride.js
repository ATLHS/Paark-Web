const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dropOffLocation: { type: String },
    dropOffTime: { type: String },
    dropBackLocation: { type: String },
    dropBackTime: { type: String },
    status: { type: String, default: "registered" },
    valet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Valet",
    },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;