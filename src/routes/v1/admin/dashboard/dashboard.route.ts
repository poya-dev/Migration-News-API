import express, { Request, Response } from 'express';

import DashboardRepo from '../../../../database/repositories/DashboardRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const languageCount = await DashboardRepo.countLanguage();
  const channelCount = await DashboardRepo.countChannel();
  const categoryCount = await DashboardRepo.countCategory();
  const newsCount = await DashboardRepo.countNews();
  const userCount = await DashboardRepo.countUser();
  const dashboardInfo = {
    language: {
      label: 'Languages',
      count: languageCount,
    },
    channel: {
      label: 'Channels',
      count: channelCount,
    },
    category: {
      label: 'Categories',
      count: categoryCount,
    },
    news: {
      label: 'News',
      count: newsCount,
    },
    user: {
      label: 'All Users',
      count: userCount,
    },
  };
  setTimeout(() => {
    ApiResponse.successResponse(res, 200, dashboardInfo);
  }, 4000);
});

export default router;
