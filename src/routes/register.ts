import { Router } from "express";

const router = Router();

router.post('/register', (req, res) => {
    res.send('Crear usuario');
})

export default router;