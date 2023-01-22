import express from "express";
import { findAll,
    create,
    update,
    findOne,
    updateAll,
    deleteCompanyInformation
} from "../controllers/companyInformation.controller.js";
const router = express.Router();

// isManager & isAdmin
router.post("/", create);
router.delete("/:id", deleteCompanyInformation);
router.patch("/:id", update);
router.put("/", updateAll);

// isEmployee
router.get("/:id", findOne);
router.get("/", findAll);



export default router;
