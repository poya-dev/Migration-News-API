import { Types } from 'mongoose';

import NewsModel from '../models/News.model';
import News from '../../types/news.type';

export default class NewsRepo {
  public static async create(news: News): Promise<News> {
    const newRec = await NewsModel.create(news);
    return newRec.toObject();
  }

  public static async findAll(): Promise<News[]> {
    return NewsModel.find()
      .populate({
        path: 'category',
        select: '_id name',
      })
      .populate({
        path: 'channel',
        select: '_id name iconUrl',
      })
      .populate({
        path: 'language',
        select: '_id name',
      })
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<News[]>()
      .exec();
  }

  public static async findByLanguageId(
    id: Types.ObjectId
  ): Promise<News[] | null> {
    return NewsModel.find({ language: id, status: 'Published' })
      .populate({
        path: 'category',
        select: '_id name',
      })
      .populate({
        path: 'channel',
        select: '_id name iconUrl',
      })
      .lean<News[]>()
      .exec();
  }

  public static async findById(id: Types.ObjectId): Promise<News | null> {
    return NewsModel.findById(id)
      .populate({
        path: 'category',
        select: '_id name',
      })
      .populate({
        path: 'channel',
        select: '_id name iconUrl',
      })
      .populate({
        path: 'language',
        select: '_id name',
      })
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<News | null>()
      .exec();
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
      .populate({
        path: 'category',
        select: '_id name',
      })
      .populate({
        path: 'channel',
        select: '_id name iconUrl',
      })
      .lean<News>()
      .exec();
  }

  public static async findByTitle(title: string): Promise<News | null> {
    return NewsModel.findOne({ title: title })
      .populate({
        path: 'category',
        select: '_id name',
      })
      .populate({
        path: 'channel',
        select: '_id name iconUrl',
      })
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<News | null>()
      .exec();
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
