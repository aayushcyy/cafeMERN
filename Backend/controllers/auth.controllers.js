import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.models.js";

const registerController = async (req, res) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password)
    return res
      .status(404)
      .json({ msg: "Please provide all the crendentials." });

  try {
    const userAvailable = await User.findOne({
      phone: phone,
    });
    if (userAvailable)
      return res
        .status(404)
        .json({ msg: "User already registered! Please login." });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      phone: phone,
      password: hashedPass,
      bookings: [],
    });

    await user.save();

    const payload = { userId: user._id, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ msg: "User created successful!", token });
  } catch (error) {
    res.status(500).json({ msg: "error signing up!", error });
  }
};

const loginController = async (req, res) => {};

export { registerController, loginController };
