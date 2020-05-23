import { Response } from 'express';

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

export default {
  sendOk,
  sendCreated,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendConflict,
  sendInternalError,
};
