import express from 'express';
import lambdaController from '../controllers/aws/lambdaController';

const router = express.Router();

router.get('/lambda', lambdaController.getFunctions, async (req, res) => {
  res.status(200).json(res.locals.lambdaFunctions)
})

export default router;