import express from 'express';
import routes from './routes';
import { config } from 'dotenv';
import { connect } from 'mongoose';

config();

const app = express();
const port = process.env.PORT || 3000;
//app.use(routes);

const dbUrl = process.env.DB_URL
console.log('Mongo URL: ', dbUrl);

app.use(express.json());

connect(dbUrl as string).then(res => {
    console.log('Habemus mongoose');
    app.use(routes);
    app.listen(port, () => {
        console.log(`App is running in port`, port);
    })
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});
