import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Bookings } from "../models/Bookings.models.js";
import { User } from "../models/Users.models.js"; // Assuming Users collection exists

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const makePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id; // Assuming user ID is extracted from authentication middleware

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Include phone number in response
    res.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    console.log("Received body in /payment/verify:", req.body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("Missing payment details:", req.body);
      return res
        .status(400)
        .json({ success: false, message: "Invalid Payment Data" });
    }

    const userId = req.user._id; // Extract user ID from authentication middleware
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate Razorpay signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.error("Signature mismatch!");
      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }

    console.log("Payment verified successfully!");

    // Save payment details in bookings collection
    const doc = await Bookings.findOne({ bookingId: bookingId });

    if (!doc) {
      console.log("User not found with the given phone number.");
      return res.status(404).json({ error: "Booking not found" });
    }

    Object.assign(doc, {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: 500,
      status: "Success",
    });

    await doc.save();

    res.json({
      success: true,
      message: "Payment Verified",
      phone: user.phoneNumber, // Include phone number in response
    });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ error: error.message });
  }
};

export { makePayment, verifyPayment };
