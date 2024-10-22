import { NextFunction, Request, Response } from "express";
import User from '../models/users'
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 7;

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const { role } = req.body.user;
    if( role === 'Admin'){
        res.sendStatus(HTTP_STATUS_CODES.SUCCESS)
    } else {
        res.sendStatus(HTTP_STATUS_CODES.FORBBIDEN)
    }

}

/* 
en el json irían los emails y en cada uno se le coloca el nuevo:
{
    email: unEmailChido@gmail.com,
    newPassword: 'nuevaContraMamalona'
}
*/

export const changePassword = async (req: Request, res: Response) => {
    const { email, newPassword } = req.body
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            user.password = hashedPassword;
        }
        res.status(HTTP_STATUS_CODES.NO_CONTENT).json(user)
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

/* 
{
    email: unEmailChido@gmail.com,
    newRole: 'Admin'
}
*/

export const changeRole = async (req: Request, res: Response) => {
    const { email, newRole } = req.body
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const hashedRole = await bcrypt.hash(newRole, SALT_ROUNDS);
            user.role = hashedRole;
        }
        res.status(HTTP_STATUS_CODES.NO_CONTENT).json(user)
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

/* 
{
    email: unEmailChido@gmail.com,
    newStatus: 'Desactivado'
}
*/

export const changeStatus = async (req: Request, res: Response) => {
    const { email, newStatus } = req.body
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const hashedStatus = await bcrypt.hash(newStatus, SALT_ROUNDS);
            user.status = hashedStatus;
        }
        res.status(HTTP_STATUS_CODES.NO_CONTENT).json(user)
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}