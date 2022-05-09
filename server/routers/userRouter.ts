import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import cookieController from '../controllers/cookieController';

// Sign up requests
router.post(
  '/signup',
  userController.createUser,
  cookieController.setCookieCredentials,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.confirmation);
  }
);

// Login requests
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setCookieCredentials,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.confirmation);
  }
);

export default router;
