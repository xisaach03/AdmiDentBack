import Clients from '../models/client';
import Client from "../types/client";

export const saveImageToClient = async (email: string, image: string) => {
    const clientToUpload: Client | null = await Clients.findOne({ email });
    if (clientToUpload) {
        const result = await Clients.findOneAndUpdate({ email }, {
            $push: { Images: image }
        })
        return true
    } else {
        return false
    }
};
