import { NextFunction, Request, Response } from "express"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import auth from "../models/auth";
import User from '../models/users'
import bcrypt from 'bcrypt';
import { sendNotification } from "./socket.controller";

class AuthController { 
    //Registro
    registerUser = async (req: Request, res: Response) => {
        console.log(req.body)
        const { name, email, password, role } = req.body;

        try {
            const user = await auth.registerUser(name, email, password, role);

            // Simulación de registro (aquí podrías agregar la lógica real con una base de datos)
            console.log('Nuevo usuario registrado:', name);

            // Enviar notificación a todos los clientes conectados
            sendNotification(`El usuario ${name} registrado exitosamente`);
          
            res.cookie('user', JSON.stringify(user), { signed: true , httpOnly : false});
          
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
            res.cookie('user', JSON.stringify(user), { signed: true , httpOnly : false});

            res.sendStatus(HTTP_STATUS_CODES.SUCCESS);
        } else if (!pswdValid) {
            res.sendStatus(HTTP_STATUS_CODES.AUTHORIZATION);
        } else {    
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST)
        }
    };
}

const authController = new AuthController();
export default authController;
