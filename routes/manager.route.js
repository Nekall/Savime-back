import express from "express";
const router = express.Router();

// Controllers
import {
  create,
  findOne,
  findAll,
  update,
  deleteManager,
  login,
} from "../controllers/manager.controller.js";

// Middlewares
import isManager from "../middlewares/isManager.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";

// Public
router.post("/", create);
router.post("/login", login);

// isEmployee & isManager & isAdmin
router.get("/", isAuth, findAll);

// isManager
router.get("/:id", isManager, findOne);
router.patch("/:id", isManager, update);

// isAdmin
router.delete("/:id", isAdmin, deleteManager);

export default router;
