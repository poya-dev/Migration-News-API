import express from 'express';

import facebookSignIn from './facebook-sign-in.route';
import singUpRoute from './sign-up.route';
import loginRoute from './login.route';

const router = express.Router();

router.use('/sign-up', singUpRoute);
router.use('/login', loginRoute);
router.use('/facebook', facebookSignIn);

export default router;
