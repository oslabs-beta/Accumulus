// Import boilerplate
import express, { Express, Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import 'dotenv/config';
import cors from 'cors';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Router imports
import userRouter from './routers/userRouter.js';
import awsRouter from './routers/awsRouter.js';

// Declare Express server and port constant
const app: Express = express();
const PORT: number = 3000;

// __dirname Boiler plate
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB for authentication
mongoose.connect(`${process.env.MONGO_URI!}`);

// Parse request bodies
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

// Serve all static files in dist directory
app.use(express.static(path.join(__dirname, '../')));

// Router endpoints
app.use('/api/user', userRouter);
app.use('/api/aws', awsRouter);

// Catch-all route handler for Express requests to an unknown route
app.use((req: Request, res: Response): void => {
  res.status(404).send('Unknown path');
});

// Error object handler
app.use((err: object, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log('errorObj', errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

// Spin up server
app.listen(PORT, (): void => {
  console.log(`Listening on ${PORT}`);
});

export default app;
