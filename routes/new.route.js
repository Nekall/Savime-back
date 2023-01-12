import express from "express";
import {
  create,
  findOne,
  update,
  findAll,
  deleteNews,
} from "../controllers/new.controller.js";
const router = express.Router();

router.post("/", create);
router.get("/:id", findOne);
router.patch("/:id", update);
router.get("/", findAll);
router.delete("/:id", deleteNews);

export default router;
