import express, { Request, Response } from 'express';

import ApiResponse from '../../../utils/api-response';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const imagePath = req.file?.path;
  return ApiResponse.successResponse(res, 201, imagePath);
});

export default router;
