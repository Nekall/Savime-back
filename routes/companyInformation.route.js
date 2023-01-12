import express from "express";
import { findAll,
    create,
    update,
    findOne,
    deleteInfo,
} from "../controllers/companyInformation.controller.js";
const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.put("/:id", update);
router.get("/:id", findOne);
// ##################
router.delete("/", deleteInfo);

export default router;
