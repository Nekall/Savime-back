import express from "express";
const router = express.Router();

// Controllers
import {
  create,
  findOne,
  update,
  findAll,
  deleteNews,
} from "../controllers/new.controller.js";

// Middlewares
import isManager from "../middlewares/isManager.js";
import isEmployee from "../middlewares/isEmployee.js";

// isEmployee
router.get("/", isEmployee, findAll);
router.get("/:id", isEmployee, findOne);

// isManager & isAdmin
router.post("/", isManager, create);
router.patch("/:id", isManager, update);
router.delete("/:id", isManager, deleteNews);

export default router;
