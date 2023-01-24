import express from "express";
const router = express.Router();

// Controllers
import {
  findAll,
  create,
  update,
  findOne,
  updateAll,
  deleteCompanyInformation,
} from "../controllers/companyInformation.controller.js";

// Middlewares
import isManager from "../middlewares/isManager.js";
import isAuth from "../middlewares/isAuth.js";

// isManager & isAdmin
router.post("/", isManager, create);
router.delete("/:id", isManager, deleteCompanyInformation);
router.patch("/:id", isManager, update);
router.put("/", isManager, updateAll);

// isEmployee or isManager or isAdmin
router.get("/:id", isAuth, findOne);
router.get("/", isAuth, findAll);

export default router;
