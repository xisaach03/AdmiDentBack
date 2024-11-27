import { Router } from "express";
import { createTreatment, updateTreatment } from "../controllers/treatment.controller";

const router = Router();

router.post('', createTreatment);
router.put('', updateTreatment);

export default router;