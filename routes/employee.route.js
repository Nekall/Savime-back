import express from "express";
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
const router = express.Router();

// Public
router.post("/", create);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// isEmployee
router.patch("/verified/:id", verified);

// isEmployee or isAdmin
router.get("/", findAll);
router.get("/:id", findOne);

// isAdmin
router.patch("/:id", update);
router.delete("/:id", deleteEmployee);


export default router;
