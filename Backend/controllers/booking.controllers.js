import express from "express";
import { Bookings } from "../models/Bookings.models.js";

const booking = async (req, res) => {
  const id = req.params.id;
  const { name, phone, branch, date, slot } = req.body;
  if (!name || !phone || !slot || !date || !branch)
    return res.status(400).json({ msg: "Please provide all the details" });

  try {
    // Check if a booking with the same bookingId, date, branch, and slot already exists
    const existingBooking = await Bookings.findOne({
      bookingId: id,
      date: date,
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
      date: date,
      slot: slot,
      amountPaid: "Rs.200",
      transactionId: "0FVZ85UR024SJ",
    });

    const createdBooking = await bookingDoc.save();

    res.status(201).json({
      msg: `Congratulation ${name.toUpperCase()}, your slot has been booked!`,
      Receipt: createdBooking,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error booking the slot", error: error });
  }
};

export { booking };
