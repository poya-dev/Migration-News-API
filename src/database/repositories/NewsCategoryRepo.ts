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
    return NewsCategoryModel.find()
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
      .lean<NewsCategory[]>()
      .exec();
  }

  public static async findByLanguageId(
    id: Types.ObjectId
  ): Promise<NewsCategory[]> {
    return NewsCategoryModel.find({ language: id, active: true })
      .select('_id name')
      .lean<NewsCategory[]>()
      .exec();
  }

  public static async findById(
    id: Types.ObjectId
  ): Promise<NewsCategory | null> {
    return NewsCategoryModel.findById(id)

      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<NewsCategory | null>()
      .exec();
  }

  public static async findByName(name: string): Promise<NewsCategory | null> {
    return NewsCategoryModel.findOne({ name: name })
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<NewsCategory | null>()
      .exec();
  }

  public static async findByActiveStatus(
    activeStatus: Boolean
  ): Promise<NewsCategory[]> {
    return NewsCategoryModel.find({ active: activeStatus })
      .select('_id name')
      .lean<NewsCategory[]>()
      .exec();
  }

  public static async activate(id: Types.ObjectId): Promise<NewsCategory> {
    return NewsCategoryModel.findByIdAndUpdate(id, { $set: { active: true } })
      .lean<NewsCategory>()
      .exec();
  }

  public static async deactivate(id: Types.ObjectId): Promise<NewsCategory> {
    return NewsCategoryModel.findByIdAndUpdate(id, { $set: { active: false } })
      .lean<NewsCategory>()
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
