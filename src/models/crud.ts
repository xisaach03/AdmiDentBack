import { Request, Response } from 'express';
import User from '../models/users'
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 7;

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.send(users)
      } catch (err) {
        console.error(err);
      }
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

