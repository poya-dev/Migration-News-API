import BookmarkModel from '../models/Bookmark.model';
import Bookmark from '../../types/bookmark.type';

export default class BookmarkRepo {
  public static async add(bookmark: Bookmark): Promise<Bookmark> {
    const newRec = await BookmarkModel.create(bookmark);
    return newRec.toObject();
  }

  public static async remove(filter: any): Promise<Bookmark | null> {
    return BookmarkModel.findOneAndDelete(filter).lean<Bookmark>().exec();
  }

  public static async findAll(): Promise<Bookmark[] | null> {
    return BookmarkModel.find()
      .populate('user')
      .populate('news')
      .lean<Bookmark[] | null>()
      .exec();
  }

  public static async findByFilter(filter: Bookmark): Promise<Bookmark | null> {
    return BookmarkModel.findOne(filter).lean<Bookmark | null>().exec();
  }
}
