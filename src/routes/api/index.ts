import { Router } from 'express';
import { UserRouter } from './userRoutes.js';

const router = Router();

router.use('/users', UserRouter);

export default router;