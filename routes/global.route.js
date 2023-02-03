import express from "express";
const router = express.Router();

// Controllers
import {
  contact,
  newsletters,
  jwtTokenVerification,
} from "../controllers/global.controller.js";

// Public
router.get("/", (req, res) => {
  res.redirect("https://www.savime.tech/");
});
router.post("/contact", contact);
router.post("/newsletters", newsletters);
router.post("/verification", jwtTokenVerification);

export default router;
