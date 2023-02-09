import express, { Request, Response } from 'express';

import DashboardRepo from '../../../../database/repositories/DashboardRepo';
import numToMonthName from '../../../../utils/number-to-month-name';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

type datasetType = { label: string; data: number[] };
type userActivityType = { labels: string[]; datasets: datasetType };

router.get('/', async (req: Request, res: Response) => {
  const languageCount = await DashboardRepo.countLanguage();
  const channelCount = await DashboardRepo.countChannel();
  const categoryCount = await DashboardRepo.countCategory();
  const consultingCount = await DashboardRepo.countConsulting();
  const newsCount = await DashboardRepo.countNews();
  const userCount = await DashboardRepo.countUser();
  const chartArray = await DashboardRepo.recentUsers();

  let userActivity: userActivityType = {
    labels: [],
    datasets: { label: 'Mobile apps', data: [] },
  };

  if (chartArray.length > 0)
    chartArray.forEach((activeUser) => {
      userActivity.labels.push(numToMonthName(activeUser._id));
      userActivity.datasets.data.push(activeUser.count);
    });

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
    consulting: {
      label: 'Consulting request',
      count: consultingCount,
    },
    news: {
      label: 'News',
      count: newsCount,
    },
    user: {
      label: 'All Users',
      count: userCount,
    },
    userChart: userActivity,
  };
  setTimeout(() => {
    ApiResponse.successResponse(res, 200, dashboardInfo);
  }, 4000);
});

export default router;
