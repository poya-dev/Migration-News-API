import express, { Request, Response } from 'express';

import ApiResponse from '../../../utils/api-response';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { filename } = req.file!;
  return ApiResponse.successResponse(res, 201, filename);
});

export default router;
