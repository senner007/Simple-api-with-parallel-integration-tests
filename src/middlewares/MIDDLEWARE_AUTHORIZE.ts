import { Response, Request, RequestHandler, NextFunction } from 'express';
import { IListRequest, middleware } from './middleware.interfaces';
import { Unauthorized } from '../httpError/httpError';
import {
  ICredentials,
  IUser,
  ERoles,
} from '../controllers/api-controllers/api_interfaces';
import {
  getUserRoleByUserId,
  getUserByUserName,
} from '../repositories/api-repository';

function MIDDLEWARE_AUTHORIZE(...roles: ERoles[]): middleware {
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
