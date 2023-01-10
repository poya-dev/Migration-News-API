import express from 'express';

import userRoute from './user/user.route';
import newsCategoryRoute from './news/newsCategory.route';
import newsRoute from './news/news.route';

const router = express.Router();

router.use('/users', userRoute);
router.use('/news-category', newsCategoryRoute);
router.use('/news', newsRoute);

export default router;
