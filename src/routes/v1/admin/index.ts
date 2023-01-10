import express from 'express';

import userRoute from './user/user.route';
import newsCategoryRoute from './news/newsCategory.route';
import newsRoute from './news/news.route';
import channelRoute from './channel/channel.route';

const router = express.Router();

router.use('/users', userRoute);
router.use('/news-category', newsCategoryRoute);
router.use('/news', newsRoute);
router.use('/channel', channelRoute);

export default router;
