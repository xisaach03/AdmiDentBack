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
import { Express } from 'express-serve-static-core';
import session from "express-session";
import passport from "./middlewares/google-auth";


config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://admident.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'email'],
    credentials: true
}));

const dbUrl = process.env.DB_URL;

const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));


app.use(express.json());
app.use(cookieParser(process.env.secretKey));

app.use(
    session({
      secret: "tu_secreto", // Cambiar a un secreto seguro en producción
      resave: false,
      saveUninitialized: true,
    })
  );
  
  // Inicializar Passport
  app.use(passport.initialize());
  app.use(passport.session());

app.use(routes);

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
function googleAuth(app: Express) {
    throw new Error('Function not implemented.');
}

