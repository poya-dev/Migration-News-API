import express from 'express';

import requiredLogin from '../../middlewares/requiredLogin';
import authRoute from './auth';
import adminRoute from './admin';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', requiredLogin, adminRoute);

export default router;
