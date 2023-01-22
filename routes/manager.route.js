import express from "express";
import {
  create,
  findOne,
  findAll,
  update,
  deleteManager,
  login,
} from "../controllers/manager.controller.js";
const router = express.Router();

// Public
router.post("/", create);
router.post("/login", login);

// isManager
router.get("/:id", findOne);
router.patch("/:id", update);

// isAdmin
router.delete("/:id", deleteManager);
router.get("/", findAll);

export default router;
