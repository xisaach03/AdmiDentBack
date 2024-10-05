import { Schema, model, SchemaTypes } from 'mongoose';

const userSchema = new Schema({
  name: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true, unique: true },
  password: {  type: SchemaTypes.String, required: true },
  role: {  type: SchemaTypes.String, default: 'Asistente' },
  status: { type: SchemaTypes.String, default: 'Activo' }
})

const user = model('user', userSchema);

export default user;
