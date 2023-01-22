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

// isManager & isAdmin
router.post("/", create);

// isEmployee & isManager
router.get("/:id", findOne);
router.get("/", findAll);
router.patch("/:id", update);
router.get("/employee/:id", findAllByEmployee)

// isAdmin
router.delete("/:id", deleteDoc);

export default router;
