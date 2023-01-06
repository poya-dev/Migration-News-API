import { Response } from 'express';

export const sendSuccessResponse = (
  res: Response,
  code: number,
  data: any,
  message = 'successfully'
) => res.status(code).json({ status: 'success', data: data, message: message });

export const sendErrorResponse = (
  res: Response,
  code: number,
  errorMessage: any
) => res.status(code).json({ status: 'failure', errorMessage: errorMessage });
