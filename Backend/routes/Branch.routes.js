import express from "express";
import { slotsAvailable } from "../controllers/slots.controllers.js";

const router = express.Router();

router.get("/", slotsAvailable);

export default router;
