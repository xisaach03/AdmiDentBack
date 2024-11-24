import request from 'supertest';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

describe('API Endpoints', () => {
  // Prueba para el registro de un usuario
  it('POST /api/data - should return a personalized greeting', async () => {
    const response = await request('http://localhost:3000')
      .post('/register')
      .send({
        "name": "prueba",
        "email": "cavap84981@lineacr.com",
        "password": "contrasena",
        "role": "Admin"
      });
    expect(response.status).toBe(HTTP_STATUS_CODES.USER_CREATED);
    expect(response.body).toEqual({ message: 'Bienvenido: prueba' });
  });

  // Prueba para el login de un usuario
  it('POST /api/data - should return a personalized greeting', async () => {
    const response = await request('http://localhost:3000')
      .post('/login')
      .send({
        "email": "cavap84981@lineacr.com",
        "password": "contrasena"
      });
    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
    expect(response.body).toEqual({ message: 'Welcome prueba' });
  });

  // Prueba para intentar eliminar un usuario que SI existe
  it('DELETE /api/data - should return a 400 error if name is missing', async () => {
    const email = "cavap84981@lineacr.com";
    const response = await request('http://localhost:3000').delete(`/home?email=${email}`);
    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);

    // Prueba para intentar eliminar un usuario que NO existe
    it('DELETE /api/users/:id - should return 404 if user not found', async () => {
      const email = 999; // ID de un usuario que no existe

      const response = await request('http://localhost:3000').delete(`/home?email=${email}`);

      expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
      expect(response.body).toEqual({ error: 'Wrong User or does not exist' });
    });
  });
});