import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
