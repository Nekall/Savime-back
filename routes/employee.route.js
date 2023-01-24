import express from "express";
const router = express.Router();

// Controllers
import {
  create,
  findOne,
  findAll,
  update,
  deleteEmployee,
  login,
  forgotPassword,
  resetPassword,
  verified,
} from "../controllers/employee.controller.js";

// Middlewares
import isEmployee from "../middlewares/isEmployee.js";
import isAdmin from "../middlewares/isAdmin.js";

// Public
router.post("/", create);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// isEmployee
router.patch("/:id", isEmployee, update);
router.patch("/verified/:id", isEmployee, verified);

// isEmployee or isAdmin
router.get("/", isEmployee, findAll);
router.get("/:id", isEmployee, findOne);

// isAdmin
router.delete("/:id", isAdmin, deleteEmployee);


export default router;
