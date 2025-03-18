import express from "express";
import profile from "../controllers/profile.controllers.js";

const router = express.Router();

router.get("/me", profile);

export default router;
