import { Request, Response } from 'express';
import User from '../models/users'
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

export const getAll = () => {

}

export const getByEmail = async (req: Request, res: Response) => {
    const { email } = req.query
    console.log("email:", email)
    try {
        const user = await User.findOne({ email: email })
        res.status(HTTP_STATUS_CODES.SUCCESS).json(user)
        //return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

export const deleteByEmail = async (email: string) => {
    try {
        const user = await User.deleteOne({ email: email });
        return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

export const updateByEmial = async (email: string, name?: string, status?: string) => {
    try {
        const user = await User.findOne({ email: email })
        if (name && user) {
            user.name = name;
            await user.save();
        }
        if (status && user) {
            user.status = status;
            await user.save();
        }
        return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

export const changePassword = async (email: string, newPassword: string) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            user.password = newPassword;
        }
        return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}