import { Types } from 'mongoose';

import NewsCategoryModel from '../models/NewsCategory.model';
import NewsCategory from '../../types/newsCategory.type';

export default class NewsCategoryRepo {
  public static async create(
    newsCategory: NewsCategory
  ): Promise<NewsCategory> {
    const newRec = await NewsCategoryModel.create(newsCategory);
    return newRec.toObject();
  }

  public static async findAll(): Promise<NewsCategory[]> {
    return NewsCategoryModel.find().lean<NewsCategory[]>().exec();
  }

  public static async findById(
    id: Types.ObjectId
  ): Promise<NewsCategory | null> {
    return NewsCategoryModel.findById(id).lean<NewsCategory | null>().exec();
  }

  public static async findByName(name: string): Promise<NewsCategory | null> {
    return NewsCategoryModel.find({ name: name })
      .lean<NewsCategory | null>()
      .exec();
  }

  public static async update(newsCategory: NewsCategory): Promise<any> {
    const now = new Date();
    newsCategory.updatedAt = now;
    return NewsCategoryModel.updateOne(
      { _id: newsCategory._id },
      { $set: { ...newsCategory } }
    )
      .lean<NewsCategory>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<NewsCategory | null> {
    return NewsCategoryModel.findByIdAndRemove(id).lean<NewsCategory>().exec();
  }
}
