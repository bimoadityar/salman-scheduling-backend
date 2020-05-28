import { Response } from 'express';

import { ParsedError } from '../services/parsedError';

type ResponseData = null | Record<string, unknown>;

const sendOk = (res: Response, data: ResponseData = null): void => {
  res.status(200).json({ status: 'success', data });
};

const sendCreated = (res: Response, data: ResponseData = null): void => {
  res.status(201).json({ status: 'success', data });
};

const sendBadRequest = (res: Response, data: ResponseData = null): void => {
  res.status(400).json({ status: 'fail', data });
};

const sendUnauthorized = (res: Response, data: ResponseData = null): void => {
  res.status(401).json({ status: 'fail', data });
};

const sendForbidden = (res: Response, data: ResponseData = null): void => {
  res.status(403).json({ status: 'fail', data });
};

const sendNotFound = (res: Response, data: ResponseData = null): void => {
  res.status(404).json({ status: 'fail', data });
};

const sendConflict = (res: Response, data: ResponseData = null): void => {
  res.status(409).json({ status: 'fail', data });
};

const sendInternalError = (res: Response, message = ''): void => {
  res.status(500).json({ status: 'error', message });
};

const handleError = (res: Response, err: Error): void => {
  if (!(err instanceof ParsedError && err.data)) {
    sendInternalError(res, err.message);
  } else if (err.message === 'bad request') {
    sendBadRequest(res, err.data);
  } else if (err.message === 'unauthorized') {
    sendUnauthorized(res, err.data);
  } else if (err.message === 'forbidden') {
    sendUnauthorized(res, err.data);
  } else if (err.message === 'not found') {
    sendNotFound(res, err.data);
  } else if (err.message === 'conflict') {
    sendConflict(res, err.data);
  } else {
    sendInternalError(res, err.message);
  }
};

export default {
  sendOk,
  sendCreated,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendConflict,
  sendInternalError,
  handleError,
};
