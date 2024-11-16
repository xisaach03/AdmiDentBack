import express from 'express';
import routes from './routes';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import swaggerConfig from './../swagger.config.json';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import { initializeSocket } from './controllers/socket.controller';
import cookieParser from 'cookie-parser';

config();

const app = express();
const port = process.env.PORT || 3000;
//app.use(routes);

app.use(cors({
    origin: 'http://localhost:4200',  // Cambia esto si tu frontend está en otro puerto o dominio
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
  
const dbUrl = process.env.DB_URL
console.log('Mongo URL: ', dbUrl);

const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser(process.env.secretKey));

app.use(routes);
connect(dbUrl as string).then(res => {
    console.log('Habemus mongoose');
    const server = app.listen(port, () => {
        console.log(`App is running in port`, port);
    })

    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    })

    initializeSocket(io)

    // io.on('connection', (socket: Socket) => {
    //     console.log('Client connected: ', socket.id)
    // })

}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});
