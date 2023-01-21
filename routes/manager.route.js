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

router.post("/", create);
router.get("/:id", findOne);
router.get("/", findAll);
router.patch("/:id", update);
router.delete("/:id", deleteManager);

router.post("/login", login);

export default router;
