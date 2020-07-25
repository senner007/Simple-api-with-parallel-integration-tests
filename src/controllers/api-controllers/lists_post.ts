import { Router, NextFunction } from 'express';
import { Response } from 'express';
import { MIDDLEWARE_AUTHENTICATE } from '../../middlewares/MIDDLEWARE_AUTHENTICATE';
import { IListRequest } from '../../middlewares/middleware.interfaces';
import {
  getUserByUserName,
  postListByUserId,
} from '../../repositories/api-repository';
import { MIDDLEWARE_VALIDATE_LIST_POST } from '../../middlewares/MIDDLEWARE_VALIDATE_LIST_POST';
import {
  IListPost,
  IUser,
  EResponseCodes,
  ERoles,
  ICredentials,
} from '../api.router.interfaces';
import { MIDDLEWARE_AUTHORIZE } from '../../middlewares/MIDDLEWARE_AUTHORIZE';

const listsPostRouter: Router = Router();

listsPostRouter.post(
  '/lists',
  [
    MIDDLEWARE_VALIDATE_LIST_POST,
    MIDDLEWARE_AUTHENTICATE,
    MIDDLEWARE_AUTHORIZE(ERoles.OWNER),
  ],
  async (
    req: IListRequest<IListPost & ICredentials>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user: IUser = await getUserByUserName(req.body.user_name);
      await postListByUserId(user.id, req.body.list_name);
      res.sendStatus(EResponseCodes.OK);
    } catch (error) {
      next(error);
    }
  },
);

export { listsPostRouter };
