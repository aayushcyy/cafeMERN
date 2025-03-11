import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors";
import slotsRouter from "./routes/Branch.routes.js";

const app = express();

connectDB();

// CORS and json middleware
app.use(cors());
app.use(express.json());

// Route
app.get("/", (req, res) => {
  res.send("Welcom to cafeziq");
});

app.use("/slots", slotsRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
