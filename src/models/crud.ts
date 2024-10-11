import { Request, Response } from 'express';
import User from '../models/users'
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import { strict } from 'assert';

export const getAll = () => {

}

//LISTO: http://localhost:3000/home?email=JohnDoe@example.com
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

//LISTO: http://localhost:3000/home?email=JohnDoe@example.com
export const deleteByEmail = async (req: Request, res: Response) => {
    const { email } = req.query
    console.log("email:", email)
    try {
        const user = await User.deleteOne({ email: email });
        res.status(HTTP_STATUS_CODES.SUCCESS).json(user)
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

//LISTO http://localhost:3000/home?email=JohnDoe@example.com&name=Lechuga
export const updateByEmail = async (req: Request, res: Response) => {
    const { email, name, status } = req.query
    console.log("email:", email)
    try {
        const user = await User.findOne({ email: email })
        
        if (name && user) {
            user.name = name.toString();
            await user.save();
        }
        if (status && user) {
            user.status = status.toString();
            await user.save();
        }
        if (name && status && user) {
            user.name = name.toString();
            user.status = status.toString();
            await user.save();
        }
        res.status(HTTP_STATUS_CODES.NO_CONTENT).json(user)
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
