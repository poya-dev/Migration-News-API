import { Types } from 'mongoose';

import ChannelModel from '../models/Channel.model';
import Channel from '../../types/channel.type';

export default class ChannelRepo {
  public static async create(channel: Channel): Promise<Channel> {
    const newRec = await ChannelModel.create(channel);
    return newRec.toObject();
  }

  public static async findAll(): Promise<Channel[]> {
    return ChannelModel.find()
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<Channel[]>()
      .exec();
  }

  public static async findById(id: Types.ObjectId): Promise<Channel | null> {
    return ChannelModel.findById(id)
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<Channel | null>()
      .exec();
  }

  public static async findByName(name: string): Promise<Channel | null> {
    return ChannelModel.findOne({ name: name })
      .populate({
        path: 'createdBy',
        select: '_id name email',
      })
      .populate({
        path: 'updatedBy',
        select: '_id name email',
      })
      .lean<Channel | null>()
      .exec();
  }

  public static async findByActivateStatus(
    activeStatus: boolean
  ): Promise<Channel[] | null> {
    return ChannelModel.find({ active: activeStatus })
      .select('_id name iconUrl')
      .lean<Channel[]>()
      .exec();
  }

  public static async activate(id: Types.ObjectId): Promise<Channel> {
    return ChannelModel.findByIdAndUpdate(id, { $set: { active: true } })
      .lean<Channel>()
      .exec();
  }

  public static async deactivate(id: Types.ObjectId): Promise<Channel> {
    return ChannelModel.findByIdAndUpdate(id, { $set: { active: false } })
      .lean<Channel>()
      .exec();
  }

  public static async update(channel: Channel): Promise<any> {
    const now = new Date();
    channel.updatedAt = now;
    return ChannelModel.updateOne(
      { _id: channel._id },
      { $set: { ...channel } }
    )
      .lean<Channel>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<Channel | null> {
    return ChannelModel.findByIdAndRemove(id).lean<Channel>().exec();
  }
}
