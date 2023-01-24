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
import isManager from "../middlewares/isManager.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";

// isManager & isAdmin
router.post("/", isManager, create);
router.delete("/:id", isManager, deleteDoc);

// isEmployee & isManager & isAdmin
router.get("/:id", isAuth, findOne);
router.get("/", isAuth, findAll);
router.patch("/:id", isAuth, update);
router.get("/employee/:id", isAuth, findAllByEmployee)

export default router;
