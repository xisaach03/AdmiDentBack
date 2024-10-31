import express from 'express';
import routes from './routes';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import swaggerConfig from './../swagger.config.json';
import swaggerJsDoc from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
};

config();

const app = express();
const port = process.env.PORT || 3000;
//app.use(routes);


app.use(cors(corsOptions));

const dbUrl = process.env.DB_URL
console.log('Mongo URL: ', dbUrl);

const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser(process.env.secretKey))

connect(dbUrl as string).then(res => {
    console.log('Habemus mongoose');
    app.use(routes);
    app.listen(port, () => {
        console.log(`App is running in port`, port);
    })
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});
