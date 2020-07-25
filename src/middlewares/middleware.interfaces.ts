import { Request, Response, RequestHandler, NextFunction } from 'express';
import { ICredentials } from '../controllers/api.router.interfaces';

export interface IListRequest<T> extends Request {
  body: T;
}

export type middleware = (
  req: IListRequest<ICredentials>,
  res: Response<any>,
  next: NextFunction,
) => Promise<void>;
