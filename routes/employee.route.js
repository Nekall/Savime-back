import express from "express";
import {
  create,
  findOne,
  findAll,
  update,
  remove,
  login,
  forgotPassword,
  resetPassword,
  verified,
} from "../controllers/employee.controller.js";
const router = express.Router();

router.post("/", create);
router.get("/:id", findOne);
router.get("/", findAll);
router.patch("/:id", update);
router.patch("/verified/:id", verified);
router.delete("/:id", remove);

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
