import { Request, Response, RequestHandler, NextFunction } from 'express';
import { ICredentials } from '../controllers/api.router.interfaces';

export interface IListRequest<T> extends Request {
  body: T;
}
