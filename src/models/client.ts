import { Schema, model, Model } from 'mongoose';
import { Treatment } from '../types/treatment';

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String},
  Birthday: { type: String },
  Age: { type: Number },
  Occupation: { tpye: String },
  Hobbies: { type: String },
  EmergencyContact: { type: String },
  Treatments: { type: Array }
});

const client = model('Client', clientSchema);

export default client;
