import express from "express";
import { login } from "../controllers/admin.controller.js";
const router = express.Router();

// Public
router.post("/login", login);

export default router;
