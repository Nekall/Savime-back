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
import isManager from "../middlewares/isManager.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";

// Public
router.post("/", create);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// isEmployee
router.patch("/:id", isEmployee, update);
router.patch("/verified/:id", isEmployee, verified);

// isEmployee or isManager or isAdmin
router.get("/", isAuth, findAll);
router.get("/:id", isAuth, findOne);

// isAdmin
router.delete("/:id", isAdmin, deleteEmployee);


export default router;
