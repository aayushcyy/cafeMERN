import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
import slotsRouter from "./routes/Slots.routes.js";
import bookingRouter from "./routes/Book.routes.js";
import authRouter from "./routes/Auth.routes.js";
import profileRouter from "./routes/Profile.routes.js";

const app = express();

connectDB();

// CORS and json middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Welcom to cafeziq");
});

// Availability Route
app.use("/slots", slotsRouter);

// booking route
app.use("/book", bookingRouter);

// authentication route
app.use("/auth", authRouter);

// user profile route
app.use("/profile", profileRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
