import express from 'express';

import updateLastActive from '../../middlewares/updateLastActive';
import requiredLogin from '../../middlewares/requiredLogin';
import upload from '../../middlewares/fileUpload';
import uploadRoute from './upload/upload.route';
import authRoute from './auth';
import adminRoute from './admin';
import clientRoute from './client';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/upload', requiredLogin, upload.single('image'), uploadRoute);
router.use('/admin', requiredLogin, updateLastActive, adminRoute);
router.use('/client', requiredLogin, updateLastActive, clientRoute);

export default router;
