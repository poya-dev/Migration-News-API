import express from 'express';

import authRoute from './auth';
import adminRoute from './admin';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);

export default router;
