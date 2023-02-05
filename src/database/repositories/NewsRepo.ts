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

  public static async findNews(
    user: any,
    filter: any,
    page: number,
    limit: number
  ): Promise<any> {
    return NewsModel.aggregate([
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'news',
          pipeline: [
            {
              $match: user,
            },
          ],
          as: 'bookmarks',
        },
      },
      {
        $addFields: {
          isBookmark: {
            $cond: [
              {
                $eq: [
                  {
                    $size: '$bookmarks',
                  },
                  0,
                ],
              },
              false,
              true,
            ],
          },
        },
      },
      {
        $match: { $and: [filter] },
      },
      { $project: { bookmarks: 0 } },
      { $limit: limit * 1 },
      { $skip: (page - 1) * limit },
    ]);
  }

  public static async findById(id: Types.ObjectId): Promise<News | null> {
    return NewsModel.findById(id).lean<News | null>().exec();
  }

  public static async actionSetDraft(id: Types.ObjectId): Promise<any> {
    return NewsModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Draft' } },
      { new: true }
    )
      .lean<any>()
      .exec();
  }

  public static async actionSetSubmitted(id: Types.ObjectId): Promise<any> {
    return NewsModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Submitted' } },
      { new: true }
    )
      .lean<any>()
      .exec();
  }

  public static async actionSetPublished(id: Types.ObjectId): Promise<any> {
    return NewsModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Published' } },
      { new: true }
    )
      .lean<any>()
      .exec();
  }

  public static async actionSetDeactivated(id: Types.ObjectId): Promise<any> {
    return NewsModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Deactivated' } },
      { new: true }
    )
      .lean<any>()
      .exec();
  }

  public static async findAndUpdateViewCount(
    id: Types.ObjectId
  ): Promise<News | null> {
    return NewsModel.findByIdAndUpdate(
      id,
      { $inc: { view_count: 1 } },
      { new: true }
    )
      .lean<News>()
      .exec();
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
