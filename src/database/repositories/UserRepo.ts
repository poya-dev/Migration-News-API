import { Types } from 'mongoose';

import UserModel from '../models/User.model';
import IUser from '../../types/user.type';

const USER_DETAILS = '+_id +name +email +role +userPictureUrl +isVerified';

export default class UserRepo {
  public static async create(user: IUser): Promise<IUser> {
    const newRec = await UserModel.create(user);
    return newRec.toObject();
  }

  public static async findAll(): Promise<IUser[]> {
    return UserModel.find().select(USER_DETAILS).lean<IUser[]>().exec();
  }

  public static async findById(id: Types.ObjectId): Promise<IUser | null> {
    return UserModel.findById(id).select(USER_DETAILS).lean<IUser>().exec();
  }

  public static async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email })
      .select(USER_DETAILS)
      .lean<IUser>()
      .exec();
  }

  public static async update(user: IUser): Promise<any> {
    const now = new Date();
    user.updatedAt = now;
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean<IUser>()
      .exec();
  }

  public static async remove(id: Types.ObjectId): Promise<IUser | null> {
    return UserModel.findByIdAndRemove(id).lean<IUser>().exec();
  }
}
