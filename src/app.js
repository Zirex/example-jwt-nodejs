import dotenv from 'dotenv';

if(process.env.NODE_ENV === 'development'){
    dotenv.config();
}

import express, {json, urlencoded} from 'express';
import morgan from 'morgan';

const app = express();

// Import routes
import userRoutes from './routes/user'

app.set('port', process.env.PORT || 4000);

app.use(urlencoded({extended: false}));
app.use(json());
app.use(morgan('dev'));

app.use('/api/user', userRoutes);

export default app;