import request from 'supertest';
import { HTTP_STATUS_CODES } from '../src/types/http-status-codes'

describe('User Endpoints', () => {
  // Prueba para el registro de un usuario
  it('POST Create user', async () => {
    const response = await request('http://localhost:3000')
      .post('/register')
      .send({
        "name": "prueba",
        "email": "cavap84981@lineacr.com",
        "password": "contrasena",
        "role": "Admin"
      });

    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
  });


  // Prueba para el login de un usuario
  it('POST Login', async () => {
    const response = await request('http://localhost:3000')
      .post('/login')
      .send({
        "email": "cavap84981@lineacr.com",
        "password": "contrasena"
      });

    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
  });

  
  // Prueba para intentar eliminar un usuario que SI existe
  it('DELETE delete created user', async () => {
    const email = "cavap84981@lineacr.com";
    const response = await request('http://localhost:3000').delete(`/home?email=${email}`);
    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);

  });
});

describe('Client Endpoints', () => {
 
  // Prueba para el login de un usuario
  it('PUT update client', async () => {
    const response = await request('http://localhost:3000')
      .put('/clients')
      .send({
        "firstName": "example",
        "lastName": "text",
        "email": "correo@correo.com",
        "password": "contrasena",
        "phone": "1234567890",
        "gender": "female",
        "Birthday": "26/11/2011",
        "Age": 777,
        "Occupation": "Student",
        "Hobbies": "sing",
        "EmergencyContact": "1234567890",
        "Treatments": []
      });

    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
  });

   // Prueba para el registro de un usuario
   it('POST Create user', async () => {
    const response = await request('http://localhost:3000')
      .post('/treatment')
      .send({
        "email": "ejemplo@ejemplo.com",
        "Treatments": {
            "date": "2024-11-26",
            "treatment": "test"
        }
    });

    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
  });
  
  // Prueba para intentar eliminar un usuario que SI existe
  it('Get clients', async () => {
    const response = await request('http://localhost:3000').get(`/clients`);
    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);

  });
});
