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
    provider: string,
    accessToken: string
  ): Promise<User> {
    const isGoogle = provider === 'Google';
    const rec = await UserModel.findOne({
      'authProvider.id': isGoogle ? profile.sub : profile.id,
    });
    if (!rec) {
      const user = {
        name: isGoogle ? profile.name : profile.displayName,
        email: isGoogle ? profile.email : profile.emails[0].value || '',
        authProvider: {
          id: isGoogle ? profile.sub : profile.id,
          name: isGoogle ? 'Google' : 'Facebook',
          token: accessToken,
        },
        isVerified: true,
        userPictureUrl: isGoogle ? profile.picture : profile.photos[0].value,
      };
      const newRec = await UserModel.create(user);
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

  public static async updateLastSeen(id: Types.ObjectId): Promise<any> {
    const now = new Date();
    return UserModel.updateOne({ _id: id }, { $set: { lastActive: now } })
      .lean<User>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findByIdAndRemove(id).lean<User>().exec();
  }
}
