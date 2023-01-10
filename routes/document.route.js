import express from "express";
import {
  create,
  findOne,
  findAll,
  deleteDoc,
  findAllByEmployee
} from "../controllers/document.controller.js";
const router = express.Router();

router.post("/", create);
router.get("/:id", findOne);
router.get("/", findAll);
router.delete("/", deleteDoc);
router.get("/employee/:id", findAllByEmployee)

export default router;
