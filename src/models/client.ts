import { Schema, model, connect, Model } from 'mongoose';

const clientDBConnection = connect(process.env.CLIENT_DB_URI || '')
  .then(() => console.log('Conexión exitosa a la base de datos de clientes'))
  .catch((err) => console.error('Error al conectar con la base de datos de clientes:', err));

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },  // Agregando el campo password
});

const Client: Model<any> = model('Client', clientSchema);

export default Client;
