import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.models.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "Action denied! Please login first" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userId);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default authMiddleware;
