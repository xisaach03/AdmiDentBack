# Proyecto CRUD 

Este proyecto es una API para gestionar usuarios con diferentes roles (Administrador, Doctor, Asistente). Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y permite manejar la información de usuarios almacenada en una base de datos MongoDB.

## Requisitos

- Node.js (v14 o superior)
- MongoDB
- Postman (para realizar consultas HTTP)


## Instrucciones de instalación y configuración

### 1. Clonar el repositorio

Clona el repositorio en tu máquina local utilizando Git:

```bash
git clone <URL_DEL_REPOSITORIO>
```

### 2. Instalar las dependencias
Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

### 3. Configurar el archivo .env
En la raíz del proyecto, crea un archivo .env con la siguiente variable de entorno:
```bash
DB_URL=<tu url de MongoDB>
```
Asegúrate de reemplazar <tu url de MongoDB> con la cadena de conexión de tu base de datos MongoDB.

### 4. Ejecutar el servidor

Inicia el servidor con el siguiente comando:
```bash
npm run dev
```
El servidor se ejecutará en http://localhost:3000.

## Uso de la API
Puedes utilizar Postman para interactuar con la API. A continuación, algunos ejemplos de consultas:

### 1. Obtener un usuario por emai
```bash
GET http://localhost:3000/home?email=email@example.com
```

### 2. Crear un nuevo usuario
```bash
POST http://localhost:3000/register
```
```bash
{
  "name": "John",
  "email": "JohnDoe@example.com",
  "password": "JohnDoesPassword",
  "role": "Doctor",
  "status": "active"
}
```
Continúa experimentando con la API!