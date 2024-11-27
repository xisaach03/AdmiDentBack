import bcrypt from 'bcrypt';
import User from '../models/users'
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';


const SALT_ROUNDS = 7;

class Authenticator {

//LISTO: http://localhost:3000/register
/* PARA PROBAR EN POSTMAN
{
  "name": "John",
  "email": "JohnDoe@example.com",
  "password": "JohnDoesPassword",
  "role": "Doctor",
  "status": "active"
}
*/
    registerUser = async (name: string, email: string, password: string, role: string) => {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            status: 'active'
        });

        await newUser.save();
        return newUser;
    }


    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
           res.status(HTTP_STATUS_CODES.NOT_FOUND).send("User not found");
        }

        if (user!.status != 'active') {
            res.status(HTTP_STATUS_CODES.NOT_FOUND).send('Account desactivated');
        }

        const isPasswordValid = await bcrypt.compare(password, user!.password);
        if (!isPasswordValid) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Wrong password')
        }
        return user;
    }
}

const auth = new Authenticator();
export default auth;
