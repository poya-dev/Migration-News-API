import { Response } from 'express';

export default class ApiResponse {
  public static sendAccessToken(
    res: Response,
    code: number,
    token: string,
    message = 'successfully'
  ) {
    return res.status(code).json({
      status: 'success',
      accessToken: token,
      message,
    });
  }

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
