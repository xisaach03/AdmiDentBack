import { Router } from "express";

const router = Router();

router.post('/login', (req, res) => {
    res.send('Crear usuario');
})

export default router;