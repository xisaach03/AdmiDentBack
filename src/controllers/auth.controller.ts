import { NextFunction, Request, Response } from "express"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import auth from "../models/auth";
import User from '../models/users'
import bcrypt from 'bcrypt';

class AuthController { 
    //Registro
    registerUser = async (req: Request, res: Response) => {
        console.log(req.body)
        const { name, email, password, role } = req.body;

        try {
            const user = await auth.registerUser(name, email, password, role);
            res.status(HTTP_STATUS_CODES.USER_CREATED).json({ message: 'User has been created' });
        } catch (error) {
            res.send(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const pswdValid = await bcrypt.compare(password, user?.password as string);
    
        if (pswdValid) {
            req.body.found = pswdValid;
            req.body.user = user;
            next();
        } else {
            res.sendStatus(400);
        }
    };
}

const authController = new AuthController();
export default authController;
