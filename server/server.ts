// Import boilerplate
import express, {
  Express,
  Response,
  Request,
  Router,
  NextFunction,
} from 'express';
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';

// Declare Express server and port constant
const app: Express = express();
const PORT: number = 3000;

// __dirname Boiler plate
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse request bodies
app.use(express.json());

// Serve all static files in dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Router imports
import userRouter from './routers/userRouter.js';

// Router endpoints
app.use('/user', userRouter);

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
