import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
import slotsRouter from "./routes/Slots.routes.js";
import bookingRouter from "./routes/Book.routes.js";
import authRouter from "./routes/Auth.routes.js";
import profileRouter from "./routes/Profile.routes.js";
import paymentRouter from "./routes/Payment.routes.js";

const app = express();

connectDB();

// CORS and json middleware
app.use(
  cors({
    origin: [
      "cafeziq.vercel.app",
      "cafeziq-aayush-chaudharys-projects.vercel.app",
      "cafeziq-a2ss07r11-aayush-chaudharys-projects.vercel.app",
      "https://cafeziq-git-master-aayush-chaudharys-projects.vercel.app/",
    ],
    credentials: true,
  })
);
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

// payment gateway
app.use("/payment", paymentRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
