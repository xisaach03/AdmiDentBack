import { body } from "express-validator";

export default function validateRegister() {
    return [
        body('name').trim().notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 8, max: 20 })
    ]
}