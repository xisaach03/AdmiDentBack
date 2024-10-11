import { Router } from "express";
import { getByEmail } from "../models/crud"

const router = Router();

router.get('', getByEmail, (req, res) => {
    res.send('Lista de usuarios');
})

export default router;