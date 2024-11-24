import { Request, Response } from 'express';
import Client from '../models/client';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

export const createClient = async (req: Request, res: Response) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(HTTP_STATUS_CODES.SUCCESS).json(savedClient);
  } catch (error) {
    const err = error as Error;
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: err.message });
  }
};

export const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(HTTP_STATUS_CODES.SUCCESS).json(clients);
  } catch (error) {
    const err = error as Error;
    res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: err.message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status(HTTP_STATUS_CODES.SUCCESS).json(client);
  } catch (error) {
    const err = error as Error;
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: err.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.status(HTTP_STATUS_CODES.SUCCESS).json(updatedClient);
  } catch (error) {
    const err = error as Error;
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: err.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
  } catch (error) {
    const err = error as Error;
    res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: err.message });
  }
};
