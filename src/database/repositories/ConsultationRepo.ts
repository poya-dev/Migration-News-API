import { Types } from 'mongoose';

import ConsultationModel from '../models/Consultation.model';
import Consultation from '../../types/consultation.type';

export default class ConsultationRepo {
  public static async create(request: Consultation): Promise<Consultation> {
    const newRec = await ConsultationModel.create(request);
    return newRec.toObject();
  }

  public static async findAll(): Promise<Consultation[]> {
    return ConsultationModel.find()
      .populate('response')
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .lean<Consultation[]>()
      .exec();
  }

  public static async findById(
    id: Types.ObjectId
  ): Promise<Consultation | null> {
    return ConsultationModel.findById(id)
      .populate('response')
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .lean<Consultation | null>()
      .exec();
  }

  public static async findByUserId(
    id: Types.ObjectId
  ): Promise<Consultation | null> {
    return ConsultationModel.find({ user: id })
      .populate('response')
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .lean<Consultation | null>()
      .exec();
  }

  public static async addResponse(
    id: Types.ObjectId,
    responseMessage: string
  ): Promise<any> {
    const now = new Date();
    return ConsultationModel.findByIdAndUpdate(id, {
      $set: { 'response.message': responseMessage, 'response.createdAt': now },
    })
      .lean<Consultation>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<Consultation | null> {
    return ConsultationModel.findByIdAndRemove(id).lean<Consultation>().exec();
  }
}
