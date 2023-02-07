import { Types } from 'mongoose';

import ConsultingModel from '../models/Consulting.model';
import Consulting from '../../types/consulting.type';

export default class ConsultationRepo {
  public static async create(request: Consulting): Promise<Consulting> {
    const newRec = await ConsultingModel.create(request);
    return newRec.toObject();
  }

  public static async findAll(): Promise<Consulting[]> {
    return ConsultingModel.find()
      .populate('response')
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .lean<Consulting[]>()
      .exec();
  }

  public static async findById(id: Types.ObjectId): Promise<Consulting | null> {
    return ConsultingModel.findById(id)
      .populate('response')
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .lean<Consulting | null>()
      .exec();
  }

  public static async findByUserId(id: Types.ObjectId): Promise<Consulting[]> {
    return ConsultingModel.find({ createdBy: id })
      .select('_id')
      .populate('response')
      .where('response.message')
      .ne(null)
      .lean<Consulting[]>()
      .exec();
  }

  public static async addResponse(
    id: Types.ObjectId,
    responseMessage: string
  ): Promise<Consulting> {
    const now = new Date();
    return ConsultingModel.findByIdAndUpdate(
      id,
      {
        $set: {
          'response.message': responseMessage,
          'response.createdAt': now,
        },
      },
      { new: true }
    )
      .lean<Consulting>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<Consulting | null> {
    return ConsultingModel.findByIdAndRemove(id).lean<Consulting>().exec();
  }
}
