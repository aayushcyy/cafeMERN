import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
