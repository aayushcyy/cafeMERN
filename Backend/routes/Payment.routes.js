import express from "express";
import {
  makePayment,
  verifyPayment,
} from "../controllers/makePayment.controllers.js";
import authMiddleware from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/now", authMiddleware, makePayment);

router.post("/verify", authMiddleware, verifyPayment);

export default router;
