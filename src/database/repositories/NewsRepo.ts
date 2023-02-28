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
      { $match: { $and: [filter] } },
      { $project: { bookmarks: 0 } },
      { $skip: (page - 1) * limit },
      { $limit: limit * 1 },
    ]);
  }

  public static async search(user: any, filter: any): Promise<News[]> {
    return NewsModel.aggregate([
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'news',
          pipeline: [{ $match: user }],
          as: 'bookmarks',
        },
      },
      {
        $addFields: {
          isBookmark: {
            $cond: [{ $eq: [{ $size: '$bookmarks' }, 0] }, false, true],
          },
        },
      },
      { $match: { $and: [filter] } },
      {
        $project: {
          content: 0,
          channel: 0,
          language: 0,
          status: 0,
          createdBy: 0,
          updatedBy: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);
  }

  public static async findById(id: Types.ObjectId): Promise<News | null> {
    return NewsModel.findById(id).lean<News | null>().exec();
  }

  public static async findByTitle(title: string): Promise<News | null> {
    return NewsModel.findOne({ title: title }).lean<News | null>().exec();
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

  public static async actionSetPublished(id: Types.ObjectId): Promise<any> {
    return NewsModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Published' } },
      { new: true }
    )
      .lean<any>()
      .exec();
  }

  public static async actionSetArchived(id: Types.ObjectId): Promise<any> {
    return NewsModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Archived' } },
      { new: true }
    )
      .lean<any>()
      .exec();
  }

  public static async findAndUpdateViewCount(
    user: Types.ObjectId,
    recId: Types.ObjectId
  ): Promise<any> {
    await NewsModel.findByIdAndUpdate(recId, { $inc: { view_count: 1 } });
    return NewsModel.aggregate([
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'news',
          pipeline: [
            {
              $match: { user: user },
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
      { $project: { bookmarks: 0 } },
      { $match: { _id: recId } },
      { $limit: 1 },
    ]);
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
