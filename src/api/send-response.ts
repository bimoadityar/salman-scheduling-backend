import { Response } from 'express';

type ResponseData = null | Record<string, unknown>;

const sendResponse = (
  res: Response,
  code: number,
  data: ResponseData | string = null,
): void => {
  if (code < 400) {
    res.status(code).json({ status: 'success', data });
  } else if (code < 500) {
    res.status(code).json({ status: 'fail', data });
  } else {
    res.status(code).json({ status: 'error', message: data });
  }
};

export default sendResponse;
