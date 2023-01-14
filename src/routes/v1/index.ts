import express from 'express';

import requiredLogin from '../../middlewares/requiredLogin';
import authRoute from './auth';
import adminRoute from './admin';
import clientRoute from './client';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', requiredLogin, adminRoute);
router.use('/client', requiredLogin, clientRoute);

export default router;
