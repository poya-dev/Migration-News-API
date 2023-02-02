import express from 'express';

import newsCategoryRoute from './news/newsCategory.route';
import userActivityRoute from './activity/userActivity.route';
import newsRoute from './news/news.route';

const router = express.Router();

router.use('/news-category', newsCategoryRoute);
router.use('/user-activity', userActivityRoute);
router.use('/news', newsRoute);

export default router;
