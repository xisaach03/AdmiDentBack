import { Router, Request, Response } from "express";
import { deleteByEmail, getByEmail, updateByEmail } from "../models/crud"

const router = Router();

router.get('', getByEmail, (req, res) => {
    res.send('Lista de usuarios');
})


router.delete('', deleteByEmail, (req, res) => {
    res.send('User deleted')
});

router.put('', updateByEmail, (req, res) => {
    res.send('Email updated')
});

export default router;