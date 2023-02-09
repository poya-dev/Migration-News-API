import NewsCategoryModel from '../models/NewsCategory.model';
import ConsultingModel from '../models/Consulting.model';
import LanguageModel from '../models/Language.model';
import ChannelModel from '../models/Channel.model';
import NewsModel from '../models/News.model';
import UserModel from '../models/User.model';

export default class DashboardRepo {
  public static async countLanguage(): Promise<number> {
    return LanguageModel.countDocuments().lean<number>().exec();
  }

  public static async countChannel(): Promise<number> {
    return ChannelModel.countDocuments().lean<number>().exec();
  }

  public static async countCategory(): Promise<number> {
    return NewsCategoryModel.countDocuments().lean<number>().exec();
  }

  public static async countConsulting(): Promise<number> {
    return ConsultingModel.countDocuments().lean<number>().exec();
  }

  public static async countNews(): Promise<number> {
    return NewsModel.countDocuments().lean<number>().exec();
  }

  public static async countUser(): Promise<number> {
    return UserModel.countDocuments().lean<number>().exec();
  }

  public static async recentUsers(): Promise<any[]> {
    return UserModel.aggregate([
      { $group: { _id: { $month: '$lastActive' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
  }
}
