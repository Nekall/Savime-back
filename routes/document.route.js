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

// Middlewares
import isEmployee from "../middlewares/isEmployee.js";
import isManager from "../middlewares/isManager.js";
import isAdmin from "../middlewares/isAdmin.js";

// isManager & isAdmin
router.post("/", isManager, create);

// isEmployee & isManager
router.get("/:id", isEmployee || isManager, findOne);
router.get("/", isEmployee || isManager, findAll);
router.patch("/:id", isEmployee || isManager, update);
router.get("/employee/:id", isEmployee || isManager, findAllByEmployee)

// isAdmin
router.delete("/:id", isAdmin, deleteDoc);

export default router;
