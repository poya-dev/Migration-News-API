import express from 'express';

import facebookSignIn from './facebook-sign-in.route';
import googleSignIn from './google-sign-in.route';
import singUpRoute from './sign-up.route';
import loginRoute from './login.route';

const router = express.Router();

router.use('/facebook', facebookSignIn);
router.use('/google', googleSignIn);
router.use('/sign-up', singUpRoute);
router.use('/login', loginRoute);

export default router;
