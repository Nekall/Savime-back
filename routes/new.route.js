import express from "express";
import {
  create,
  findOne,
  update,
  findAll,
  deleteNews,
} from "../controllers/new.controller.js";
const router = express.Router();

// isEmployee
router.get("/", findAll);
router.get("/:id", findOne);

// isManager & isAdmin
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", deleteNews);

export default router;
