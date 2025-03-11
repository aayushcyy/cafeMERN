import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bookings: [
      {
        bookingId: {
          type: String,
        },
        bookingDate: {
          type: String,
        },
        branch: {
          type: String,
        },
        slot: {
          type: String,
        },
        amountPaid: {
          type: String,
        },
        transactionId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
