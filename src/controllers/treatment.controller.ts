import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import Clients from '../models/client';
import Client from "../types/client";

export const createTreatment = async (req: Request, res: Response) => {
    const { email, Treatments } = req.body;
    console.log('ando en el endpoint')
    try {
        const updatedTreatment: Client | null = await Clients.findOne({ email });
        console.log('data: ', updatedTreatment);
        if (updatedTreatment) {
            console.log("treatments: ", Treatments)
            const result = await Clients.findOneAndUpdate({ email }, {
                $push: {Treatments: Treatments}
            })
            console.log("result: ", result)
            res.status(HTTP_STATUS_CODES.SUCCESS).send("el objeto se ha actualizado correctamente")
        }
        else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Usuario no encontrado')
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(error)
    }
};

export const updateTreatment = async (req: Request, res: Response) => {
    const { email, Treatments } = req.body;
    console.log('ando en el endpoint')
    try {
        const updatedTreatment: Client | null = await Clients.findOne({ email });
        console.log('data: ', updatedTreatment);
        if (updatedTreatment) {
            console.log("treatments: ", Treatments)
            // console.log("update: ", updatedTreatment);
            const result = await Clients.findOneAndUpdate({ email }, { Treatments })
            console.log("result: ", result)
            res.status(HTTP_STATUS_CODES.SUCCESS).send("el objeto se ha actualizado correctamente")
        }
        else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Usuario no encontrado')
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(error)
    }
};

