import express from "express";
import { create, findOne, findAll, deleteDoc } from "../controllers/document.controller.js";
const router = express.Router();

router.post("/", create);
router.get('/:id', findOne);
router.get('/', findAll);
router.delete("/", deleteDoc);

export default router;
