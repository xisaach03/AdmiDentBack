import { Router } from 'express';
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/client.controller';

const router = Router();

router.post('', createClient);
router.get('', getClients);
router.get('/:id', getClientById);
router.put('', updateClient);
router.delete('/:id', deleteClient);

export default router;
