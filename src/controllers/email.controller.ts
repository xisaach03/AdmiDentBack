import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

export function sendRegisterEmail(req: Request, res: Response) {

    const { name } = req.body

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const html = fs.readFileSync(path.join(__dirname, '..', 'views', 'emails', 'register.html'));

    const to = req.body.email + '';

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Register email',
        text: 'is it text email?',
        html
    };

    transporter.sendMail(mailOptions).then(response => {
        console.log('Response: ', response);
        res.send(`Bienvenido: ${name}`,).status(HTTP_STATUS_CODES.USER_CREATED);
    }).catch(error => {
        console.log('Error: ', error);
        res.send('Failed to send email').status(HTTP_STATUS_CODES.BAD_REQUEST);
    })
}
