import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { ApiResponseMiddleware, errorHandlerMiddleware } from './middlewares/index';
import { getEnvVariable } from '../utility/index';
import Router from './routes/index';

dotenv.config();

const app = express();


app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers['access-control-request-private-network'] === 'true') {
        res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }
    next();
});


const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || ''] 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({ 
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || !process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
}));
app.use(ApiResponseMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use('/api', Router);


app.use(errorHandlerMiddleware);

const PORT = getEnvVariable('PORT') || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/doc`);
});