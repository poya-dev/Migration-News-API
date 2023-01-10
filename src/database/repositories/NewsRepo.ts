import { Types } from 'mongoose';

import NewsModel from '../models/News.model';
import News from '../../types/news.type';

export default class NewsRepo {
  public static async create(news: News): Promise<News> {
    const newRec = await NewsModel.create(news);
    return newRec.toObject();
  }

  public static async findAll(): Promise<News[]> {
    return NewsModel.find().lean<News[]>().exec();
  }

  public static async findById(id: Types.ObjectId): Promise<News | null> {
    return NewsModel.findById(id).lean<News | null>().exec();
  }

  public static async findByTitle(title: string): Promise<News | null> {
    return NewsModel.findOne({ title: title }).lean<News | null>().exec();
  }

  public static async update(news: News): Promise<any> {
    const now = new Date();
    news.updatedAt = now;
    return NewsModel.updateOne({ _id: news._id }, { $set: { ...news } })
      .lean<News>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<News | null> {
    return NewsModel.findByIdAndRemove(id).lean<News>().exec();
  }
}
