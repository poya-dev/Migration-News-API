import express from 'express';

import userRoute from './user/user.route';
import newsCategoryRoute from './news/newsCategory.route';

const router = express.Router();

router.use('/users', userRoute);
router.use('/news-category', newsCategoryRoute);

export default router;
