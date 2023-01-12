import express from "express";
import {
  create,
  findOne,
  findAll,
  deleteDoc,
  findAllByEmployee,
  update
} from "../controllers/document.controller.js";
const router = express.Router();

router.post("/", create);
router.get("/:id", findOne);
router.patch("/:id", update);
router.get("/", findAll);
router.delete("/:id", deleteDoc);
router.get("/employee/:id", findAllByEmployee)

export default router;
