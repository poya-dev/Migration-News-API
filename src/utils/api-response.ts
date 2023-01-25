import { Response } from 'express';

export default class ApiResponse {
  public static sendAccessToken(
    res: Response,
    code: number,
    user: any,
    token: string,
    successMessage = 'successfully'
  ) {
    return res.status(code).json({
      status: 'success',
      user: user,
      accessToken: token,
      successMessage: successMessage,
    });
  }

  public static successResponse(
    res: Response,
    code: number,
    data: any,
    successMessage = 'successfully'
  ) {
    return res
      .status(code)
      .json({ status: 'success', data: data, successMessage: successMessage });
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
