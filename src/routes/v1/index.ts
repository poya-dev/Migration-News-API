import express from 'express';

import requiredLogin from '../../middlewares/requiredLogin';
import adminRoute from './admin';
import authRoute from './auth';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', requiredLogin, adminRoute);

export default router;
