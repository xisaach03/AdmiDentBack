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
            updatedTreatment.Treatments.push(Treatments)
            console.log("update: ", updatedTreatment);
            Clients.findOneAndUpdate({ email },
                { $push: { treatments: { updatedTreatment } } },
                { new: true })
            console.log(Clients.findOneAndUpdate({ email },
                { $push: { treatments: { updatedTreatment } } },
                { new: true },))
            res.status(HTTP_STATUS_CODES.SUCCESS).send(updatedTreatment)
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
    const { email, treatment } = req.body;

    try {
        const updatedClient: Client | null = await Clients.findOne({ email });

        if (updatedClient) {
            const foundTreatment = updatedClient.Treatments?.find(treat => treat.date === treatment.date);

            if (foundTreatment) {
                foundTreatment.treatment = treatment.treatment;

                await Clients.updateOne({ email }, updatedClient);

                res.json({ message: 'Tratamiento actualizado correctamente' });
            } else {
                res.status(404).json({ message: 'Tratamiento no encontrado' });
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al actualizar el tratamiento' });
    }
};

// export const getClients = async (_req: Request, res: Response) => {
//     try {
//         const clients = await Client.find();
//         res.status(HTTP_STATUS_CODES.SUCCESS).json(clients);
//     } catch (error) {
//         const err = error as Error;
//         res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: err.message });
//     }
// };

// export const getClientById = async (req: Request, res: Response) => {
//     try {
//         const client = await Client.findById(req.params.id);
//         res.status(HTTP_STATUS_CODES.SUCCESS).json(client);
//     } catch (error) {
//         const err = error as Error;
//         res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: err.message });
//     }
// };

