import express, { Response, Request } from 'express';
const router = express.Router();
import userController from '../controllers/userController';

// Sign up requests
router.post(
  '/signup',
  userController.createUser,
  (req: Request, res: Response): void => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.status(200).json(res.locals.confirmation);
  }
);

// Login requests
router.post(
  '/login',
  userController.verifyUser,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.confirmation);
  }
);

export default router;
