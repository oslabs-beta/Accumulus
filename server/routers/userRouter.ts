import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import userController from '../controllers/userController';

// Sign up requests
router.post(
  '/signup',
  (req: Request, res: Response, next: NextFunction): void => {
    console.log('/signup');
    next();
  },
  userController.createUser,
  (req: Request, res: Response): void => {
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
