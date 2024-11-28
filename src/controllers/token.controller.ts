import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';

export const generateToken = (user: any) => {
    return jwt.sign({ name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET || '', { expiresIn: '1h'});
};

export const encryptPassword = (password: string): string => {
    const secret = process.env.JWT_SECRET || '';
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash;
}

export const isPasswordValid = (inputPassword: string, storedPasswordHash: string): boolean => {
    const secret = process.env.JWT_SECRET || '';
    const inputHash = crypto.createHmac('sha256', secret).update(inputPassword).digest('hex');
    return inputHash === storedPasswordHash;
}

export const decrypt = (token: string) => {
    console.log('ya en el decrypt')
    const secret = process.env.JWT_SECRET || '';
    console.log(jwt.verify(token, secret))
}