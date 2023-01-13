import { Types } from 'mongoose';

import UserModel from '../models/User.model';
import User from '../../types/user.type';

const USER_DETAILS = '_id name email role userPictureUrl isVerified';

export default class UserRepo {
  public static async create(user: User): Promise<User> {
    const newRec = await UserModel.create(user);
    return newRec.toObject();
  }

  public static async findOrCreate(
    profile: any,
    accessToken: string
  ): Promise<User> {
    const rec = await UserModel.findOne({ 'authProvider.id': profile.id });
    if (!rec) {
      const newRec = await UserModel.create({
        name: profile.displayName,
        email: profile.emails[0].value ?? '',
        authProvider: {
          id: profile.id,
          name: profile.provider,
          token: accessToken,
        },
        isVerified: true,
        imageProfile: profile.photos[0].value,
      });
      return newRec.toObject();
    }
    return rec.toObject();
  }

  public static async findAll(): Promise<User[]> {
    return UserModel.find().select(USER_DETAILS).lean<User[]>().exec();
  }

  public static async findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findById(id).lean<User>().exec();
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email }).lean<User>().exec();
  }

  public static async update(user: User): Promise<any> {
    const now = new Date();
    user.updatedAt = now;
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean<User>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findByIdAndRemove(id).lean<User>().exec();
  }
}
