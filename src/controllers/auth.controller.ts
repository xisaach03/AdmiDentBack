import { Request, Response } from "express"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import auth from "../models/auth";
import { generateToken } from "./token.controller";
import { IUser } from '../types/user';

class AuthController { 
    //Registro
    registerUser = async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;

        try {
            const user = await auth.registerUser(name, email, password, role);
            res.status(HTTP_STATUS_CODES.USER_CREATED).json({ message: 'User has been created' });
        } catch (error) {
            res.send(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }
    //login
    loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const user = await auth.loginUser( email, password);
            const token = generateToken(user as IUser);
            res.status(HTTP_STATUS_CODES.SUCCESS)
        } catch (error) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: (error as Error).message })
        }
    }
}

const authController = new AuthController();
export default authController;
