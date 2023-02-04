import express from 'express';

import newsCategoryRoute from './news/newsCategory.route';
import bookmarkRoute from './bookmark/bookmark.route';
import consultingRoute from './consulting/consulting.route';
import newsRoute from './news/news.route';

const router = express.Router();

router.use('/news-category', newsCategoryRoute);
router.use('/bookmark', bookmarkRoute);
router.use('/consulting', consultingRoute);
router.use('/news', newsRoute);

export default router;
