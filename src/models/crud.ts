import { Request, Response } from 'express';
import User from '../models/users'
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import { S3Client } from "@aws-sdk/client-s3"
import multer from "multer";
import multers3 from "multer-s3";
import dotenv from 'dotenv';

dotenv.config();


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
        res.status(HTTP_STATUS_CODES.NOT_FOUND).send('Wrong User or does not exist');
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

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
