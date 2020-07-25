import { Response, NextFunction } from 'express';
import { IListRequest } from './middleware.interfaces';
import { Unauthorized } from '../httpError/httpError';
import {
  ICredentials,
  IUser,
  ERoles,
} from '../controllers/api.router.interfaces';
import {
  getUserRoleByUserId,
  getUserByUserName,
} from '../repositories/api-repository';

export type TypeAuthorizeMiddleware = (
  req: IListRequest<ICredentials>,
  res: Response<any>,
  next: NextFunction,
) => Promise<void>;

function MIDDLEWARE_AUTHORIZE(...roles: ERoles[]): TypeAuthorizeMiddleware {
  return async function (
    req: IListRequest<ICredentials>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user: IUser = await getUserByUserName(req.body.user_name);
      const role: ERoles = await getUserRoleByUserId(user.id);
      if (!roles.includes(role)) {
        throw new Error();
      }
      return next();
    } catch (err) {
      next(new Unauthorized('Failed to authenticate user'));
    }
  };
}

export { MIDDLEWARE_AUTHORIZE };
