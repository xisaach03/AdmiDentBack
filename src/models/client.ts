// models/clients.ts
import { Schema, model, connect, Model } from 'mongoose';

// Configuración de conexión a otra base de datos
const clientDBConnection = connect(process.env.CLIENT_DB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definición del esquema de Cliente
const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Client: Model<any> = model('Client', clientSchema);

export default Client;
