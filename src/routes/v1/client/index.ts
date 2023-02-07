import express from 'express';

import newsCategoryRoute from './news/newsCategory.route';
import bookmarkRoute from './bookmark/bookmark.route';
import consultingRoute from './consulting/consulting.route';
import profileRoute from './profile/profile.route';
import newsRoute from './news/news.route';

const router = express.Router();

router.use('/news-category', newsCategoryRoute);
router.use('/bookmark', bookmarkRoute);
router.use('/consulting', consultingRoute);
router.use('/profile', profileRoute);
router.use('/news', newsRoute);

export default router;
