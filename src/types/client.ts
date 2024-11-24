import { Treatment } from "./treatment";

export default interface Client {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Agregando el campo password
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    Birthday: { type: String, required: true },
    Age: { type: Number, required: true },
    Occupation: { tpye: String, required: true },
    Hobbies: { type: String, required: true },
    EmergencyContact: { type: String, required: true },
    Treatments: Treatment[]
}
