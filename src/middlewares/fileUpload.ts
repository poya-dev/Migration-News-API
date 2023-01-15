import { Request } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, 'uploads/');
  },
  filename: function (req: Request, file: any, cb: any) {
    const extension = file.originalname.split('.')[1];
    cb(null, uuidv4() + '.' + extension);
  },
});

export default multer({ storage: storage });
