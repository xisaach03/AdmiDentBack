import { Router } from "express";
import auth from "../controllers/auth.controller"

const router = Router();

router.post('', auth.loginUser, (req, res) => {
    res.send('Crear usuario');
})

export default router;