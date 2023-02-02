import express from 'express';

import userRoute from './user/user.route';
import languageRoute from './language/language.route';
import newsCategoryRoute from './news/newsCategory.route';
import newsRoute from './news/news.route';
import channelRoute from './channel/channel.route';
import consultationRoute from './consultation/consultation.route';

const router = express.Router();

router.use('/users', userRoute);
router.use('/language', languageRoute);
router.use('/news-category', newsCategoryRoute);
router.use('/news', newsRoute);
router.use('/channel', channelRoute);
router.use('/consultation', consultationRoute);

export default router;
