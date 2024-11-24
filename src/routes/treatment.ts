import { Router } from "express";
import { createTreatment, updateTreatment } from "../controllers/treatment.controller";

const router = Router();

router.post('', createTreatment);
router.put('', updateTreatment);
// router.get('', getClients);
// router.get('/:id', getClientById);
// router.put('', updateClient);
// router.delete('/:id', deleteClient);

export default router;