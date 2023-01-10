import { Types } from 'mongoose';

import ChannelModel from '../models/Channel.model';
import Channel from '../../types/channel.type';

export default class ChannelRepo {
  public static async create(channel: Channel): Promise<Channel> {
    const newRec = await ChannelModel.create(channel);
    return newRec.toObject();
  }

  public static async findAll(): Promise<Channel[]> {
    return ChannelModel.find().lean<Channel[]>().exec();
  }

  public static async findById(id: Types.ObjectId): Promise<Channel | null> {
    return ChannelModel.findById(id).lean<Channel | null>().exec();
  }

  public static async findByName(name: string): Promise<Channel | null> {
    return ChannelModel.findOne({ name: name }).lean<Channel | null>().exec();
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
