import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.models.js";

const registerController = async (req, res) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password)
    return res.status(400).json({ msg: "Please provide all the credentials." });

  try {
    const userAvailable = await User.findOne({
      phone: phone,
    });

    if (userAvailable)
      return res
        .status(409)
        .json({ msg: "User already registered! Please login." });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(`${password}`, salt);

    const user = new User({
      name: name,
      phone: phone,
      password: hashedPass,
      bookings: [],
      role: "user",
    });

    await user.save();

    const payload = { userId: user._id, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ msg: "User created successful!", token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ msg: "error signing up!", error });
  }
};

const loginController = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    return res
      .status(404)
      .json({ msg: "Please provide all the crendentials." });

  try {
    const user = await User.findOne({
      phone: phone,
    });

    if (!user)
      return res.status(404).json({ msg: "User not found! Please Signup." });

    // Comparing Password
    const isMatch = await bcrypt.compare(`${password}`, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid password or phone!" });

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ msg: `Welcome back ${user.name}!`, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error });
  }
};

export { registerController, loginController };
