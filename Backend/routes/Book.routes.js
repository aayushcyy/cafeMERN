import express from "express";
import { booking } from "../controllers/booking.controllers.js";
import authMiddleware from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/:id", authMiddleware, booking);

export default router;
