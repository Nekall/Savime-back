import express from "express";
import { create, deleteDoc } from "../controllers/document.controller.js";
const router = express.Router();

router.post("/", create);
router.delete("/", deleteDoc);

export default router;
