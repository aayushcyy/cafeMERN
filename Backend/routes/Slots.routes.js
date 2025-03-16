import express from "express";
import { slotsAvailable } from "../controllers/slots.controllers.js";

const router = express.Router();

router.post("/", slotsAvailable);

export default router;
