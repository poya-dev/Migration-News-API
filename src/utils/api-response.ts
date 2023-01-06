import { Response } from 'express';

export default class ApiResponse {
  public static successResponse(
    res: Response,
    code: number,
    data: any,
    message = 'successfully'
  ) {
    return res
      .status(code)
      .json({ status: 'success', data: data, message: message });
  }

  public static failureResponse(
    res: Response,
    code: number,
    errorMessage: any
  ) {
    return res
      .status(code)
      .json({ status: 'failure', errorMessage: errorMessage });
  }
}
