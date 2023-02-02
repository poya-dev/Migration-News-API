import express from 'express';

import newsCategoryRoute from './news/newsCategory.route';
import userActivityRoute from './activity/userActivity.route';
import consultationRoute from './consultation/consultation.route';
import newsRoute from './news/news.route';

const router = express.Router();

router.use('/news-category', newsCategoryRoute);
router.use('/user-activity', userActivityRoute);
router.use('/consultation', consultationRoute);
router.use('/news', newsRoute);

export default router;
