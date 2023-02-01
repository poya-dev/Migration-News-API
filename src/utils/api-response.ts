import { Response } from 'express';

export default class ApiResponse {
  public static sendAccessToken(
    res: Response,
    code: number,
    user: any,
    token: string
  ) {
    return res
      .status(code)
      .json({ status: 'success', user: user, accessToken: token });
  }

  public static successResponse(
    res: Response,
    code: number,
    data: any,
    currentPage?: number,
    lastPage?: number
  ) {
    return res
      .status(code)
      .json({ status: 'success', data: data, currentPage, lastPage });
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
