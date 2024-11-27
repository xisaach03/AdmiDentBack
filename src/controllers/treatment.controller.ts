import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import Clients from '../models/client';
import Client from "../types/client";

export const createTreatment = async (req: Request, res: Response) => {
    const { email, Treatments } = req.body;
    try {
        const updatedTreatment: Client | null = await Clients.findOne({ email });
        if (updatedTreatment) {
            await Clients.findOneAndUpdate({ email }, {
                $push: {Treatments: Treatments}
            })
            res.status(HTTP_STATUS_CODES.SUCCESS).send("el objeto se ha actualizado correctamente")
        }
        else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Usuario no encontrado')
        }
    } catch (error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(error)
    }
};

export const updateTreatment = async (req: Request, res: Response) => {
    const { email, Treatments } = req.body;
    try {
        const updatedTreatment: Client | null = await Clients.findOne({ email });
        if (updatedTreatment) {
            // console.log("update: ", updatedTreatment);
            await Clients.findOneAndUpdate({ email }, { Treatments })
            res.status(HTTP_STATUS_CODES.SUCCESS).send("el objeto se ha actualizado correctamente")
        }
        else {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Usuario no encontrado')
        }
    } catch (error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(error)
    }
};

