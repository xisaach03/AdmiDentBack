import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';

export const generateToken = (user: IUser) => {
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
