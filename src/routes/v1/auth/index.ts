import express from 'express';

import singUpRoute from './sign-up.route';
import loginRoute from './login.route';

const router = express.Router();

router.use('/sign-up', singUpRoute);
router.use('/login', loginRoute);

export default router;
