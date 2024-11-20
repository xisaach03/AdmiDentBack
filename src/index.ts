import express from 'express';
import routes from './routes';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import swaggerConfig from './../swagger.config.json';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import { Server } from 'socket.io';
import { initializeSocket } from './controllers/socket.controller';
import cookieParser from 'cookie-parser';
import clientRoutes from './routes/client.routes';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const dbUrl = process.env.DB_URL;
console.log('Mongo URL: ', dbUrl);

const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser(process.env.secretKey));

app.use(routes);
app.use('/api/clients', clientRoutes);

connect(dbUrl as string)
    .then(() => {
        console.log('Habemus mongoose');
        const server = app.listen(port, () => {
            console.log(`App is running on port ${port}`);
        });

        const io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true
            }
        });

        initializeSocket(io);

    })
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
    });
