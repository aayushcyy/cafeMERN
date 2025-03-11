import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
import slotsRouter from "./routes/Slots.routes.js";
import bookingRouter from "./routes/Book.routes.js";

const app = express();

connectDB();

// CORS and json middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Welcom to cafeziq");
});

// Availability Route
app.use("/slots", slotsRouter);

// booking route
app.use("/book", bookingRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
