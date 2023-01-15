import express from "express";
import { findAll,
    create,
    update,
    findOne,
    updateAll
} from "../controllers/companyInformation.controller.js";
const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.patch("/:id", update);
router.put("/", updateAll);
router.get("/:id", findOne);

export default router;
