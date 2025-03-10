import mongoose, { Schema } from "mongoose";

const availabilitySchema = new Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
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
