import express from 'express';

import userRoute from './user/user.route';

const router = express.Router();

router.use('/users', userRoute);

export default router;
