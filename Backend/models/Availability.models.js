import mongoose, { Schema } from "mongoose";

const availabilitySchema = new Schema(
  {
    _id: {
      type: String, //setting custom id
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    slots: [
      {
        time: {
          type: String,
          required: true,
        },
        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Availability = mongoose.model("Availability", availabilitySchema);
