import { Types } from 'mongoose';

import LanguageModel from '../models/Language.model';
import Language from '../../types/language.type';

export default class LanguageRepo {
  public static async create(language: Language): Promise<Language> {
    const newRec = await LanguageModel.create(language);
    return newRec.toObject();
  }

  public static async findAll(): Promise<Language[]> {
    return LanguageModel.find()
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<Language[]>()
      .exec();
  }

  public static async findById(id: Types.ObjectId): Promise<Language | null> {
    return LanguageModel.findById(id)
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<Language | null>()
      .exec();
  }

  public static async findByName(name: string): Promise<Language | null> {
    return LanguageModel.findOne({ name: name })
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<Language | null>()
      .exec();
  }

  public static async findByCode(code: string): Promise<Language | null> {
    return LanguageModel.findOne({ code: code }).lean<Language | null>().exec();
  }

  public static async update(language: Language): Promise<any> {
    const now = new Date();
    language.updatedAt = now;
    return LanguageModel.updateOne(
      { _id: language._id },
      { $set: { ...language } }
    )
      .lean<Language>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<Language | null> {
    return LanguageModel.findByIdAndRemove(id).lean<Language>().exec();
  }
}
