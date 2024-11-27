import Clients from '../models/client';
import Client from "../types/client";

export const saveImageToClient = async (email: string, image: string) => {
    console.log("email: ", email)
    const clientToUpload: Client | null = await Clients.findOne({ email });
    console.log('data: ', clientToUpload);
    if (clientToUpload) {
        console.log("treatments: ", image)
        const result = await Clients.findOneAndUpdate({ email }, {
            $push: { Images: image }
        })
        return true
    } else {
        return false
    }
};
