import bcrypt from 'bcrypt';
import User from '../models/users'
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


const SALT_ROUNDS = 7;

class Authenticator {

//LISTO: http://localhost:3000/register
/*
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
        console.log(password)
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Wrong email');
        }

        if (user.status != 'active') {
            throw new Error('Account desactivated');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Wrong password')
        }
        return user;
    }
}

const auth = new Authenticator();
export default auth;
