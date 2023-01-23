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
import isEmployee from "../middlewares/isEmployee.js";
import isManager from "../middlewares/isManager.js";

// isManager & isAdmin
router.post("/", isManager, create);
router.delete("/:id", isManager, deleteCompanyInformation);
router.patch("/:id", isManager, update);
router.put("/", isManager, updateAll);

// isEmployee
router.get("/:id", isEmployee, findOne);
router.get("/", isEmployee, findAll);

export default router;
