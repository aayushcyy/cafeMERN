import express from "express";
import { Bookings } from "../models/Bookings.models.js";
import { User } from "../models/Users.models.js";
import { Availability } from "../models/Availability.models.js";

const booking = async (req, res) => {
  const id = req.params.id;
  const { name, phone, branch, date, slot } = req.body;
  if (!name || !phone || !slot || !date || !branch)
    return res.status(400).json({ msg: "Please provide all the details" });

  try {
    // Check if a booking with the same bookingId, date, branch, and slot already exists
    const existingBooking = await Bookings.findOne({
      bookingId: id,
      date: date.toLowerCase(),
      branch: branch.toLowerCase(),
      slot: slot,
    });

    // If a matching booking exists, return an error
    if (existingBooking) {
      return res.status(409).json({
        msg: "The slot isn't available on the same date. Sorry!",
      });
    }

    // Booking with the given details
    const bookingDoc = new Bookings({
      bookingId: id,
      name: name,
      phone: phone,
      branch: branch.toLowerCase(),
      date: date.toLowerCase(),
      slot: slot,
      amountPaid: "Rs.200",
      transactionId: "0FVZ85UR024SJ",
    });

    const createdBooking = await bookingDoc.save();

    const updatedUser = await User.findOneAndUpdate(
      { phone: phone },
      {
        $push: {
          bookings: {
            bookingId: id,
            bookingDate: date.toLowerCase(),
            branch: branch.toLowerCase(),
            slot: slot,
            amountPaid: "Rs.200",
            transactionId: "0FVZ85UR024SJ",
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      // Optional: rollback bookingDoc if critical
      return res
        .status(404)
        .json({ msg: "User not found! Booking not linked to profile." });
    }

    const updatedAvailability = await Availability.findOneAndUpdate(
      { _id: `${branch}-${date.toLowerCase()}`, "slots.time": slot },
      { $set: { "slots.$.isBooked": false } },
      { new: true, runValidators: true }
    );

    // Check if document was found
    if (!updatedAvailability) {
      return res.status(404).json({ msg: "Availability or slot not found!" });
    }

    res.status(201).json({
      msg: `Congratulation ${updatedUser.name.toUpperCase()}, your slot has been booked!`,
      Receipt: createdBooking,
      profile: updatedUser,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res
      .status(500)
      .json({ msg: "Error booking the slot", error: error.message });
  }
};

export { booking };
