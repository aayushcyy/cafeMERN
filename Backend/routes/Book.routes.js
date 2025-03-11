import express from "express";
import { booking } from "../controllers/booking.controllers.js";

const router = express.Router();

router.post("/:id", booking);

export default router;
