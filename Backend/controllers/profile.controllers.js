import jwt from "jsonwebtoken";
import { User } from "../models/Users.models.js";

const profile = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ msg: "Action denied! please login first" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    res.status(200).json({ msg: "User found", user: user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(401).json({ msg: "Invalid token or server error" });
  }
};

export default profile;
