import express from "express";
import { create, findOne, findAll, deleteNews } from "../controllers/new.controller.js";
const router = express.Router();

router.post("/", create);
router.get('/:id', findOne);
router.get('/', findAll);
router.delete("/", deleteNews);

export default router;
