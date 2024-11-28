import { NextFunction, Request, Response } from "express"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import auth from "../models/auth";
import User from '../models/users'
import bcrypt from 'bcrypt';
import { sendNotification } from "./socket.controller";
import { generateToken } from "./token.controller";
import { IUser } from '../types/user';

class AuthController { 
    //Registro
    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, role } = req.body;

        try {
            const user = await auth.registerUser(name, email, password, role);

            // Enviar notificación a todos los clientes conectados
            sendNotification(`El usuario ${name} registrado exitosamente`);
          
            res.cookie('user', JSON.stringify(user), { signed: true , httpOnly : false});
          
          next();
        } catch (error) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const pswdValid = await bcrypt.compare(password, user?.password as string);
        const { password: _, ...userEdited } = user ? user.toObject() : {};

        if (pswdValid) {

            const { name, email, role } = user!.toObject();
            const anotherUser: IUser = { name, email, role, token:'' };

            // console.log('anotherUser: ', anotherUser)
            console.log(generateToken(anotherUser))
            req.body.found = pswdValid;
            req.body.OtherUser = userEdited;
            //res.cookie('user', JSON.stringify(user), { signed: false, httpOnly : false});
            //ofuscar
           res.send(userEdited)
        } else if (!pswdValid) {
            res.sendStatus(HTTP_STATUS_CODES.AUTHORIZATION);
        } else {    
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST)
        }
    };
}

const authController = new AuthController();
export default authController;
